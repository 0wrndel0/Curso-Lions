import Book from "../models/Book.js";

const createBook = async (data) => {
  const { titulo, autor, categoria, ano, quantidadeTotal } = data;

  if (!titulo || !autor) {
    throw new Error("Título e autor são obrigatórios");
  }

  if (quantidadeTotal === undefined || quantidadeTotal <= 0) {
    throw new Error("Quantidade total precisa ser maior que zero");
  }

  return Book.create({
    titulo,
    autor,
    categoria,
    ano,
    quantidadeTotal,
    quantidadeDisponivel: quantidadeTotal,
    ativo: true,
  });
};

const getAllBooks = async () => {
  return Book.find();
};

const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Livro não encontrado");
  return book;
};

const searchByTitle = async (title) => {
  return Book.find({
    titulo: { $regex: title, $options: "i" },
  });
};

const getByCategory = async (category) => {
  return Book.find({
    categoria: { $regex: `^${category}$`, $options: "i" },
  });
};

const getAvailableBooks = async () => {
  return Book.find({
    quantidadeDisponivel: { $gt: 0 },
  });
};

const updateBook = async (id, data) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Livro não encontrado");

  const emprestados =
    book.quantidadeTotal - book.quantidadeDisponivel;

  if (data.quantidadeTotal !== undefined) {
    if (data.quantidadeTotal < emprestados) {
      throw new Error(
        "Quantidade total não pode ser menor que livros emprestados"
      );
    }

    data.quantidadeDisponivel =
      data.quantidadeTotal - emprestados;
  }

  return Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deactivateBook = async (id) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Livro não encontrado");

  const emprestados =
    book.quantidadeTotal - book.quantidadeDisponivel;

  if (emprestados > 0) {
    throw new Error(
      "Não pode desativar livro com empréstimos ativos"
    );
  }

  book.ativo = false;
  return book.save();
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  searchByTitle,
  getByCategory,
  getAvailableBooks,
  updateBook,
  deactivateBook,
};
