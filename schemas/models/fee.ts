import mongoose, { Schema, Model } from "mongoose";
import type { IFeeDocument } from "../types/type_fee.js";

const feeSchema = new Schema<IFeeDocument>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    month: {
        type: String,
        enum: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'online'],
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
}, { timestamps: true });
feeSchema.index({ customerId: 1, month: 1, year: 1 }, { unique: true });
export const FeeModel: Model<IFeeDocument> = mongoose.model<IFeeDocument>('Fee', feeSchema);
export default FeeModel;