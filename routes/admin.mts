import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middlewares/auth-middleware.mjs';
import { deleteAdmin } from '../services/adminservice.js';

const router = express.Router();

router.delete("/:id", requireAuth, requireRole("admin"), deleteAdmin);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;