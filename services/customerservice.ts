
import { Types } from "mongoose";
import type { ICustomer } from "../schemas/types/type_customer.js";
import { CustomerModel } from "../schemas/models/customer.js";

export async function createCustomer(payload: Partial<ICustomer>) {
  // Basic validations
  if (!payload.ownerName || !payload.mobileNumber || !payload.bikeNumber || !payload.bikeModel || !payload.entryDate) {
    return {
      message: "Missing required fields: ownerName, mobileNumber, bikeNumber, bikeModel, entryDate, cnic (optional), address (optional), notes (optional)",
    };
  }
  // Optionally ensure unique bikeNumber
  const exists = await CustomerModel.findOne({ bikeNumber: payload.bikeNumber }).lean();
  if (exists){
    return {
      message: "Customer with this bikeNumber already exists"
    };
  };

  return CustomerModel.create(payload);
}

export async function updateCustomer(id: string, changes: Partial<ICustomer>) {
  const updated = await CustomerModel.findByIdAndUpdate(id, changes, { new: true }).lean();
  if (!updated){
    return {
      message: "Customer not found"
    };
  };
  return updated;
}

export async function getCustomerById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return {
      message: "Invalid id"
    };
  };
  return CustomerModel.findById(id).lean();
}

export async function deleteCustomer(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return {
      message: "Invalid id"
    };
  };
  return CustomerModel.findByIdAndDelete(id).lean();
}

/**
 * Search customers by name, bikeNumber, or mobileNumber with pagination.
 * query: string to search
 */
export async function searchCustomers(query = "", page = 1, limit = 20) {
  const q = query.trim();
  const filter = q ? {
    $or: [
      { ownerName: { $regex: q, $options: "i" } },
      { bikeNumber: { $regex: q, $options: "i" } },
      { mobileNumber: { $regex: q, $options: "i" } }
    ]
  } : {};

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CustomerModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    CustomerModel.countDocuments(filter)
  ]);
  return { items, total, page, limit, pages: Math.ceil(total / limit) };
}

export async function listActiveCustomers(page = 1, limit = 50) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    CustomerModel.find({ status: "active" }).skip(skip).limit(limit).lean(),
    CustomerModel.countDocuments({ status: "active" })
  ]);
  return { items, total, page, limit, pages: Math.ceil(total / limit) };
}