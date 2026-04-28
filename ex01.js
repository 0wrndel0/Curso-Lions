// routes/loanRoutes.js
import { Router } from "express";
import {
  createLoan,
  getAllLoans,
  getLoanById,
  getLoansByUser,
  getActiveLoans,
  returnLoan,
  getOverdueLoans,
  simulateFine,
} from "../controllers/loanController.js";

const router = Router();

router.post("/loans", createLoan);
router.get("/loans", getAllLoans);
router.get("/loans/:id", getLoanById);
router.get("/loans/user/:userId", getLoansByUser);
router.get("/loans/active", getActiveLoans);
router.patch("/loans/:id/return", returnLoan);
router.get("/loans/overdue", getOverdueLoans);
router.post("/loans/:id/fine/simulate", simulateFine);

export default router;
