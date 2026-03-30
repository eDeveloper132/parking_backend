import express from 'express';
import { createFee, markPaid, monthly, deleteFee } from '../controllers/feeController.js';
import { requireAuth, requireRole } from '../middlewares/auth-middleware.mjs';

const router = express.Router();

router.post("/", createFee);
router.delete("/:id", requireAuth, requireRole("admin"), deleteFee);
router.put("/:id/pay", markPaid);
router.get("/reports/monthly/:month/:year", monthly);

export default router;