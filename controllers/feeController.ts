import asyncHandler from "express-async-handler";
import * as feeService from "../services/feeservice.js";
import type { Request, Response } from "express";

export const createFee = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.createFee(req.body);
  res.status(201).json({ 
    success: true,
    message: "Fee created successfully", 
    data: fee 
  });
});

export const markPaid = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.markFeePaid(req.params.id as string, req.body.paymentMethod, req.body.paymentDate ? new Date(req.body.paymentDate) : new Date(), req.body.amount);
  res.json({ 
    success: true,
    message: "Fee marked as paid", 
    data: fee 
  });
});

export const monthly = asyncHandler(async (req: Request, res: Response) => {
  const { month, year } = req.params;
  const report = await feeService.monthlyReport(month as any, Number(year));
  res.json({ 
    success: true,
    message: "Monthly report generated", 
    data: report 
  });
});

export const deleteFee = asyncHandler(async (req: Request, res: Response) => {
  const fee = await feeService.deleteFee(req.params.id as string);
  res.json({ 
    success: true,
    message: "Fee deleted successfully", 
    data: fee 
  });
});