import express from 'express';
import { createCustomer, getCustomer, search, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { requireAuth, requireRole } from '../middlewares/auth-middleware.mjs';

const router = express.Router();

router.post("/", requireAuth, requireRole("admin","manager"),createCustomer);
router.delete("/:id", requireAuth, requireRole("admin"), deleteCustomer);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.get("/", search);

export default router;