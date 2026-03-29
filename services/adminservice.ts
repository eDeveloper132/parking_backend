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
    return {
      message: "Missing required admin fields: name, email, password, role, mobile is optional"
    };
  }
  const exists = await AdminModel.findOne({ email }).lean();
  if (exists){
    return {
      message: "Admin with this email already exists"
    }
  }

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
  if (!admin){
    return {
      message: "Invalid Email or password."
    };
  }
  const match = await bcrypt.compare(plainPassword, admin.password);
  if (!match) {
    return {
      message: "password is not matched"
    };
  }
  const token = jwt.sign({ id: admin._id, role: admin.role, email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  const { password: _p, ...rest } = admin.toObject();
  return { admin: rest, token };
}

export async function getAdminById(id: string) {
  const admin = await AdminModel.findById(id).select("-password").lean();
  if (!admin){
    return {
      message: "Admin not found"
    };
  };
  return admin;
}
export async function updateAdmin(id: string, changes: Partial<IAdmin>) {
  if (changes.password) {
    changes.password = await bcrypt.hash(changes.password, SALT_ROUNDS);
  }
  const admin = await AdminModel.findByIdAndUpdate(id, changes, { new: true }).select("-password").lean();
  if (!admin){
    return {
      message: "Admin not found"
    };
  };
  return admin;
}

export async function deleteAdmin(id: string) {
  const admin = await AdminModel.findByIdAndDelete(id).lean();
  if (!admin){
    return {
      message: "Admin not found"
    };
  };
  return admin;
}