import { Types } from 'mongoose';

export type FeeMonth = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';
export type paymentStatus = 'paid' | 'unpaid';
export type paymentMethod = 'cash' | 'online';

export interface IFee {
    customerId: Types.ObjectId;
    month: FeeMonth;
    year: number;
    amount: number;
    paymentDate: Date;
    paymentStatus: paymentStatus;
    paymentMethod: paymentMethod;
    notes?: string;
}

export interface IFeeDocument extends IFee, Document {
    createdAt: Date;
    updatedAt: Date;
}