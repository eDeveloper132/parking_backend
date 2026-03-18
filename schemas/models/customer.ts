import mongoose, { Schema, Model } from "mongoose";
import type { ICustomerDocument } from "../types/type_customer.js";

const customerSchema = new Schema<ICustomerDocument>({
    ownerName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    bikeNumber: {
        type: String,
        required: true,
    },
    bikeModel: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    entryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export const CustomerModel: Model<ICustomerDocument> = mongoose.model<ICustomerDocument>('Customer', customerSchema);
export default CustomerModel;