import bookService from "../services/bookService.js";

// 1. Criar livro
const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// 2. Listar livros
const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// 3. Buscar por ID
const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// 4. Buscar por título (parcial)
const getBooksByTitle = async (req, res, next) => {
  try {
    const books = await bookService.getBooksByTitle(req.params.title);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// 5. Buscar por categoria
const getBooksByCategory = async (req, res, next) => {
  try {
    const books = await bookService.getBooksByCategory(req.params.category);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// 6. Listar disponíveis
const getAvailableBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAvailableBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// 7. Atualizar livro
const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// 8. Desativar livro
const deactivateBook = async (req, res, next) => {
  try {
    const book = await bookService.deactivateBook(req.params.id);
    res.json({ message: "Livro desativado com sucesso", book });
  } catch (error) {
    next(error);
  }
};

export default {
  createBook,
  getAllBooks,
  getBookById,
  getBooksByTitle,
  getBooksByCategory,
  getAvailableBooks,
  updateBook,
  deactivateBook,
};
