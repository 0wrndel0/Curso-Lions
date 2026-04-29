import express from "express";
import loanService from "../services/loanService.js";

const router = express.Router();

// Criar empréstimo
router.post("/", async (req, res) => {
  try {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  const loans = await loanService.getAllLoans();
  res.json(loans);
});

// Rotas específicas antes do :id
router.get("/user/:userId", async (req, res) => {
  const loans = await loanService.getLoansByUser(req.params.userId);
  res.json(loans);
});

router.get("/active", async (req, res) => {
  const loans = await loanService.getActiveLoans();
  res.json(loans);
});

router.get("/overdue", async (req, res) => {
  const loans = await loanService.getOverdueLoans();
  res.json(loans);
});

router.post("/:id/fine/simulate", async (req, res) => {
  try {
    const result = await loanService.simulateFine(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);
    res.json(loan);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Devolver
router.patch("/:id/return", async (req, res) => {
  try {
    const loan = await loanService.returnBook(req.params.id);
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
