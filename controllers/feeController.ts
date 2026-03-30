import asyncHandler from "express-async-handler";
import * as feeService from "../services/feeservice.js";
import type { Request, Response } from "express";

export const createFee = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.createFee(req.body);
  res.status(201).json({ message: "Fee created successfully", fee });
});

export const markPaid = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.markFeePaid(req.params.id as string, req.body.paymentMethod, req.body.paymentDate ? new Date(req.body.paymentDate) : new Date(), req.body.amount);
  res.json({ message: "Fee marked as paid", fee });
});

export const monthly = asyncHandler(async (req: Request, res: Response) => {
  const { month, year } = req.params;
  const report = await feeService.monthlyReport(month as any, Number(year));
  res.json({ message: "Monthly report generated", report });
});

export const deleteFee = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.deleteFee(req.params.id as string);
  res.json({ message: "Fee deleted successfully", fee });
});