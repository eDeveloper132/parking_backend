
import { Types } from "mongoose";
import { CustomerModel } from "../schemas/models/customer.js";
import type { IFee } from "../schemas/types/type_fee.js";
import { FeeModel } from "../schemas/models/fee.js";
import expressAsyncHandler from "express-async-handler";

/**
 * Create a fee record (ensuring the unique index customerId+month+year).
 * Throws if customer not found.
 */
export async function createFee(payload: Partial<IFee>) {
  const { customerId, month, year, amount, paymentDate, paymentMethod, paymentStatus } = payload;
  if (!customerId || !month || !year || amount == null || !paymentDate || !paymentMethod || !paymentStatus) {
    throw new Error("Missing required fields: customerId, month, year, amount, paymentDate, paymentMethod, paymentStatus");
  }
  if (!Types.ObjectId.isValid(String(customerId))) {
    throw new Error("Invalid customer id");
  }
  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    throw new Error("Customer not found");
  };

  // rely on unique index — but we can check first to throw friendlier message
  const exists = await FeeModel.findOne({ customerId, month, year }).lean();
  if (exists) {
    throw new Error(`Fee already exists in record for this ${customerId}/${month}/${year}`);
  };

  return FeeModel.create(payload);
}

export async function updateFee(id: string, changes: Partial<IFee>) {
  const fee = await FeeModel.findByIdAndUpdate(id, changes, { new: true }).lean();
  if (!fee) {
    throw new Error("Fee not found");
  };
  return fee;
}

export async function getFeeById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid id");
  };
  const fee = await FeeModel.findById(id).populate("customerId").lean();
  if (!fee) {
    throw new Error("Fee not found");
  }
  return fee;
}

export async function listFeesForCustomer(customerId: string) {
  if (!Types.ObjectId.isValid(customerId)) {
    throw new Error("Invalid customer id");
  };
  return FeeModel.find({ customerId }).sort({ year: -1, month: -1 }).lean();
}

export async function listUnpaidFees(page = 1, limit = 50) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    FeeModel.find({ paymentStatus: "unpaid" }).populate("customerId").skip(skip).limit(limit).lean(),
    FeeModel.countDocuments({ paymentStatus: "unpaid" })
  ]);
  return { items, total, page, limit, pages: Math.ceil(total / limit) };
}

/**
 * Mark a fee as paid: accepts feeId and updates paymentStatus/paymentDate/paymentMethod.
 */
export async function markFeePaid(feeId: string, paymentMethod: IFee["paymentMethod"], paymentDate = new Date(), amount?: number) {
  const update: any = { paymentStatus: "paid", paymentDate, paymentMethod };
  if (amount !== undefined) update.amount = amount;
  const fee = await FeeModel.findByIdAndUpdate(feeId, update, { new: true }).lean();
  if (!fee) {
    throw new Error("Fee not found");
  };
  return fee;
}

/**
 * Monthly report: all fees for a given month & year, aggregated totals (paid/unpaid).
 */
export async function monthlyReport(month: IFee["month"], year: number) {
  const items = await FeeModel.find({ month, year }).populate("customerId").lean();
  const totalAmount = items.reduce((s, it) => s + (it.amount || 0), 0);
  const paid = items.filter(i => i.paymentStatus === "paid").length;
  const unpaid = items.filter(i => i.paymentStatus === "unpaid").length;
  return { month, year, totalAmount, count: items.length, paid, unpaid, items };
}

export async function deleteFee(id: string) {
  const deleted = await FeeModel.findByIdAndDelete(id).lean();
  if (!deleted) {
    throw new Error("Fee not found");
  }
  return deleted;
}