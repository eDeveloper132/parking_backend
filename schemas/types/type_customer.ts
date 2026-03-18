import type { Document } from "mongoose";

export interface ICustomer {
    ownerName: string;
    fatherName: string;
    cnic?: string;
    mobileNumber: string;
    bikeNumber: string;
    bikeModel: string;
    address?: string;
    entryDate: Date;
    status: 'active' | 'inactive';
    notes?: string;
}

export interface ICustomerDocument extends ICustomer, Document {
    createdAt: Date;
    updatedAt: Date;
}