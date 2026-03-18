import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../schemas/models/admin.js";
import type { IAdmin } from "../schemas/types/type_admin.js";


const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_with_env_secret";
const JWT_EXPIRES = "7d";

export async function createAdmin(payload: Partial<IAdmin>) {
  const { name, email, password, mobile, role } = payload;
  if (!name || !email || !password || !role || !mobile) {
    throw new Error("Missing required admin fields");
  }
  const exists = await AdminModel.findOne({ email }).lean();
  if (exists) throw new Error("Admin with this email already exists");

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const admin = await AdminModel.create({
    name, email, password: hashed, mobile, role
  });
  // Do not return password
  const { password: _p, ...rest } = admin.toObject();
  return rest;
}

export async function authenticateAdmin(email: string, plainPassword: string) {
  const admin = await AdminModel.findOne({ email });
  if (!admin) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(plainPassword, admin.password);
  if (!match) throw new Error("Invalid credentials");
  const token = jwt.sign({ id: admin._id, role: admin.role, email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const { password: _p, ...rest } = admin.toObject();
  return { admin: rest, token };
}

export async function getAdminById(id: string) {
  return AdminModel.findById(id).select("-password").lean();
}

export async function updateAdmin(id: string, changes: Partial<IAdmin>) {
  if (changes.password) {
    changes.password = await bcrypt.hash(changes.password, SALT_ROUNDS);
  }
  const admin = await AdminModel.findByIdAndUpdate(id, changes, { new: true }).select("-password").lean();
  if (!admin) throw new Error("Admin not found");
  return admin;
}

export async function deleteAdmin(id: string) {
  return AdminModel.findByIdAndDelete(id).lean();
}