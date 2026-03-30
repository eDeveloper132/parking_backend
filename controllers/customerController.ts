import asyncHandler from "express-async-handler";
import * as customerService from "../services/customerservice.js";
import type { Request, Response } from "express";

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).json({ message: "Customer created successfully", customer });
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.updateCustomer(req.params.id as string, req.body);
  res.json({ message: "Customer updated successfully", customer });
});

export const getCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.getCustomerById(req.params.id as string);
  res.json({ message: "Customer details retrieved", customer });
});

export const search = asyncHandler(async (req: Request, res: Response) => {
  const { q = "", page = "1", limit = "20" } = req.query;
  const result = await customerService.searchCustomers(String(q), Number(page), Number(limit));
  res.json({ message: "Search completed successfully", ...result });
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.deleteCustomer(req.params.id as string);
  res.json({ message: "Customer deleted successfully", customer });
});