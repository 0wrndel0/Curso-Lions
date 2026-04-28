// services/loanService.js
import Loan from "../models/Loan.js";
import User from "../models/User.js";
import Book from "../models/Book.js";

const DAILY_FINE = 2;

// 1. Criar empréstimo
const createLoan = async ({ userId, bookId, diasParaDevolucao }) => {
  const user = await User.findById(userId);
  if (!user || !user.active) {
    throw new Error("Usuário inválido ou inativo");
  }

  const book = await Book.findById(bookId);
  if (!book || !book.active) {
    throw new Error("Livro inválido ou inativo");
  }

  if (book.quantidadeDisponivel <= 0) {
    throw new Error("Livro indisponível");
  }

  const alreadyHasBook = await Loan.findOne({
    userId,
    bookId,
    status: "ativo",
  });

  if (alreadyHasBook) {
    throw new Error("Usuário já possui esse livro");
  }

  book.quantidadeDisponivel -= 1;
  await book.save();

  const now = new Date();
  const dueDate = new Date();
  dueDate.setDate(now.getDate() + diasParaDevolucao);

  return await Loan.create({
    userId,
    bookId,
    dataEmprestimo: now,
    dataPrevistaDevolucao: dueDate,
    status: "ativo",
  });
};

// 2. Listar todos
const getAllLoans = () => Loan.find();

// 3. Buscar por ID
const getLoanById = (id) => Loan.findById(id);

// 4. Empréstimos por usuário
const getLoansByUser = (userId) =>
  Loan.find({ userId });

// 5. Ativos
const getActiveLoans = () =>
  Loan.find({ status: "ativo" });

// 6. Devolver livro
const returnLoan = async (id) => {
  const loan = await Loan.findById(id);
  if (!loan) throw new Error("Empréstimo não encontrado");

  if (loan.status === "devolvido") {
    throw new Error("Livro já devolvido");
  }

  const book = await Book.findById(loan.bookId);

  const now = new Date();
  let fine = 0;

  if (now > loan.dataPrevistaDevolucao) {
    const diff = now - loan.dataPrevistaDevolucao;
    const daysLate = Math.ceil(diff / (1000 * 60 * 60 * 24));
    fine = daysLate * DAILY_FINE;
  }

  book.quantidadeDisponivel += 1;
  await book.save();

  loan.status = "devolvido";
  loan.dataDevolucao = now;
  loan.multa = fine;

  return await loan.save();
};

// 7. Atrasados
const getOverdueLoans = () =>
  Loan.find({
    status: "ativo",
    dataPrevistaDevolucao: { $lt: new Date() },
  });

// 8. Simular multa
const simulateFine = async (id) => {
  const loan = await Loan.findById(id);
  if (!loan) throw new Error("Empréstimo não encontrado");

  const now = new Date();

  if (now <= loan.dataPrevistaDevolucao) {
    return { multa: 0 };
  }

  const diff = now - loan.dataPrevistaDevolucao;
  const daysLate = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return { multa: daysLate * DAILY_FINE };
};

export default {
  createLoan,
  getAllLoans,
  getLoanById,
  getLoansByUser,
  getActiveLoans,
  returnLoan,
  getOverdueLoans,
  simulateFine,
};
