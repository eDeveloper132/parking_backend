import express from 'express';
import { createFee, markPaid, monthly } from '../controllers/feeController.js';
import { requireAuth, requireRole } from '../middlewares/auth-middleware.mjs';
import { deleteFee } from '../services/feeservice.js';

const router = express.Router();

router.post("/", createFee);
router.delete("/:id", requireAuth, requireRole("admin"), deleteFee);
router.put("/:id/pay", markPaid);
router.get("/reports/monthly/:month/:year", monthly);

export default router;