import loans from "../data/loans.js";
import users from "../data/users.js";
import books from "../data/books.js";

let nextId = 1;

// 1. Criar empréstimo
export function createLoan(req, res) {
  const { userId, bookId, diasParaDevolucao } = req.body;

  const user = users.find(u => u.id == userId);
  if (!user) return res.status(404).json({ error: "Usuário não existe" });
  if (!user.active) return res.status(400).json({ error: "Usuário inativo" });

  const book = books.find(b => b.id == bookId);
  if (!book) return res.status(404).json({ error: "Livro não existe" });
  if (!book.active) return res.status(400).json({ error: "Livro inativo" });
  if (book.quantidadeDisponivel <= 0)
    return res.status(400).json({ error: "Livro sem estoque" });

  const jaPegou = loans.find(
    l => l.userId == userId && l.bookId == bookId && l.status === "ativo"
  );
  if (jaPegou)
    return res.status(400).json({ error: "Usuário já pegou esse livro" });

  book.quantidadeDisponivel--;

  const hoje = new Date();
  const dataPrevista = new Date();
  dataPrevista.setDate(hoje.getDate() + diasParaDevolucao);

  const loan = {
    id: nextId++,
    userId,
    bookId,
    dataEmprestimo: hoje,
    dataPrevistaDevolucao: dataPrevista,
    dataDevolucao: null,
    status: "ativo",
    multa: 0
  };

  loans.push(loan);
  res.status(201).json(loan);
}

// 2. Listar todos
export function getAllLoans(req, res) {
  res.json(loans);
}

// 3. Buscar por ID
export function getLoanById(req, res) {
  const loan = loans.find(l => l.id == req.params.id);
  if (!loan) return res.status(404).json({ error: "Empréstimo não encontrado" });
  res.json(loan);
}

// 4. Empréstimos por usuário
export function getLoansByUser(req, res) {
  const result = loans.filter(l => l.userId == req.params.userId);
  res.json(result);
}

// 5. Ativos
export function getActiveLoans(req, res) {
  res.json(loans.filter(l => l.status === "ativo"));
}

// 6. Devolver livro
export function returnLoan(req, res) {
  const loan = loans.find(l => l.id == req.params.id);
  if (!loan) return res.status(404).json({ error: "Não encontrado" });
  if (loan.status === "devolvido")
    return res.status(400).json({ error: "Livro já devolvido" });

  const book = books.find(b => b.id == loan.bookId);

  const hoje = new Date();
  loan.dataDevolucao = hoje;
  loan.status = "devolvido";

  book.quantidadeDisponivel++;

  const atraso = Math.floor(
    (hoje - new Date(loan.dataPrevistaDevolucao)) / (1000 * 60 * 60 * 24)
  );

  if (atraso > 0) {
    loan.multa = atraso * 2;
  }

  res.json(loan);
}

// 7. Atrasados
export function getOverdueLoans(req, res) {
  const hoje = new Date();

  const atrasados = loans.filter(
    l =>
      l.status === "ativo" &&
      new Date(l.dataPrevistaDevolucao) < hoje
  );

  res.json(atrasados);
}

// 8. Simular multa
export function simulateFine(req, res) {
  const loan = loans.find(l => l.id == req.params.id);
  if (!loan) return res.status(404).json({ error: "Não encontrado" });

  const hoje = new Date();

  const atraso = Math.floor(
    (hoje - new Date(loan.dataPrevistaDevolucao)) / (1000 * 60 * 60 * 24)
  );

  if (atraso <= 0) {
    return res.json({ multa: 0 });
  }

  res.json({
    diasAtraso: atraso,
    multa: atraso * 2
  });
}
