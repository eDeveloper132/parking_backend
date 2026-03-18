import mongoose, { Schema , Model } from "mongoose";
import type { IAdmin } from "../types/type_admin.js";

const adminSchema = new Schema<IAdmin>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['admin', 'manager'],
        required: true,
    },
}, { timestamps: true });

export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);
export default AdminModel;