import asyncHandler from "express-async-handler";
import * as adminService from "../services/adminservice.js";
import type { Request, Response } from "express";

export const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await adminService.createAdmin(req.body);
  res.status(201).json({ message: "Admin registered successfully", admin });
});

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { admin, token } = await adminService.authenticateAdmin(email, password);
  res.json({ message: "Login successful", admin, token });
});

export const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await adminService.deleteAdmin(req.params.id as string);
  res.json({ message: "Admin deleted successfully", admin });
});