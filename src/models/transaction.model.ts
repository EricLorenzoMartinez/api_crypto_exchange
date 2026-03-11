import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../interfaces/transaction.interface';

export interface ITransactionModel extends Omit<ITransaction, 'id'>, mongoose.Document {}

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
        type: { type: String, enum: ['BUY', 'SELL'], required: true },
        quantity: { type: Number, required: true },
        priceUsdAtExecution: { type: Number, required: true },
        executedAt: { type: Date, required: false, default: Date.now },
        notes: { type: String, required: false }
    },
    { timestamps: true }
);

export const TransactionModel = mongoose.model<ITransactionModel>('Transaction', transactionSchema);