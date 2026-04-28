import Loan from "../models/Loan.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

// 1. Criar empréstimo
const createLoan = async ({ userId, bookId, diasParaDevolucao }) => {
  if (!userId || !bookId || !diasParaDevolucao) {
    throw new Error("userId, bookId e diasParaDevolucao são obrigatórios");
  }

  const user = await User.findById(userId);
  if (!user || !user.ativo) {
    throw new Error("Usuário inválido ou inativo");
  }

  const book = await Book.findById(bookId);
  if (!book || !book.ativo) {
    throw new Error("Livro inválido ou inativo");
  }

  if (book.quantidadeDisponivel <= 0) {
    throw new Error("Livro indisponível");
  }

  const existingLoan = await Loan.findOne({
    userId,
    bookId,
    status: "ativo",
  });

  if (existingLoan) {
    throw new Error("Usuário já possui esse livro emprestado");
  }

  const dataPrevista = new Date();
  dataPrevista.setDate(dataPrevista.getDate() + diasParaDevolucao);

  book.quantidadeDisponivel -= 1;
  await book.save();

  return Loan.create({
    userId,
    bookId,
    dataPrevistaDevolucao: dataPrevista,
    status: "ativo",
  });
};

// 2. Listar empréstimos
const getAllLoans = async () => {
  return Loan.find().populate("userId bookId");
};

// 3. Buscar por ID
const getLoanById = async (id) => {
  const loan = await Loan.findById(id).populate("userId bookId");
  if (!loan) throw new Error("Empréstimo não encontrado");
  return loan;
};

// 4. Empréstimos de um usuário
const getLoansByUser = async (userId) => {
  return Loan.find({ userId }).populate("bookId");
};

// 5. Empréstimos ativos
const getActiveLoans = async () => {
  return Loan.find({ status: "ativo" }).populate("userId bookId");
};

// 6. Devolver livro
const returnBook = async (id) => {
  const loan = await Loan.findById(id);
  if (!loan) throw new Error("Empréstimo não encontrado");

  if (loan.status === "devolvido") {
    throw new Error("Livro já foi devolvido");
  }

  const book = await Book.findById(loan.bookId);

  const hoje = new Date();
  loan.dataDevolucao = hoje;
  loan.status = "devolvido";

  let multa = 0;

  if (hoje > loan.dataPrevistaDevolucao) {
    const atrasoMs = hoje - loan.dataPrevistaDevolucao;
    const diasAtraso = Math.ceil(atrasoMs / (1000 * 60 * 60 * 24));
    multa = diasAtraso * 2;
  }

  loan.multa = multa;

  book.quantidadeDisponivel += 1;

  await book.save();
  await loan.save();

  return loan;
};

// 7. Empréstimos atrasados
const getOverdueLoans = async () => {
  const hoje = new Date();

  return Loan.find({
    status: "ativo",
    dataPrevistaDevolucao: { $lt: hoje },
  }).populate("userId bookId");
};

// 8. Simular multa
const simulateFine = async (id) => {
  const loan = await Loan.findById(id);
  if (!loan) throw new Error("Empréstimo não encontrado");

  const hoje = new Date();

  if (hoje <= loan.dataPrevistaDevolucao) {
    return { multa: 0 };
  }

  const atrasoMs = hoje - loan.dataPrevistaDevolucao;
  const diasAtraso = Math.ceil(atrasoMs / (1000 * 60 * 60 * 24));
  const multa = diasAtraso * 2;

  return { multa };
};

export default {
  createLoan,
  getAllLoans,
  getLoanById,
  getLoansByUser,
  getActiveLoans,
  returnBook,
  getOverdueLoans,
  simulateFine,
};
