import { ITransaction, ITransactionPopulated } from '../interfaces/transaction.interface';
import { TransactionModel, ITransactionModel } from '../models/transaction.model';
import { BaseRepository } from './base.repository';
import logger from '../config/logger';
import mongoose from 'mongoose';
import { IPortfolioAggregationRaw } from '../interfaces/portfolio.interface';


export class TransactionRepository extends BaseRepository<ITransaction, ITransactionModel> {
    constructor() {
        super(TransactionModel, 'Transaction');
    }

    async getByIdWithAsset(id: string): Promise<ITransactionPopulated | null> {
        logger.debug(`Repository: Finding Transaction by ID with populated asset: ${id}`);
        const doc = await this.model.findById(id).populate('assetId');
        if (!doc) {
            logger.debug(`Repository: Transaction with ID ${id} not found`);
            return null;
        }

        logger.debug(`Repository: Found Transaction with ID ${id} and populated asset`);
        const { _id, ...rest } = doc.toObject();
        return { id: _id.toString(), ...rest } as unknown as ITransactionPopulated;
    }

    async getPortfolioByUserId(userId: string): Promise<IPortfolioAggregationRaw[]> {
        logger.debug(`Repository: Calaculating portfolio aggregation for user: ${userId}`);

        const pipeline = [
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $group: {
                    _id: "$assetId",
                    netQuantity: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "BUY" ] },
                                "$quantity",
                                { $multiply: ["$quantity", -1] }
                            ]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "assets",
                    localField: "_id",
                    foreignField: "_id",
                    as: "assetDetails"
                }
            },
            {
                $unwind: "$assetDetails"
            },
        ];

        const result = await this.model.aggregate(pipeline);
        return result;
    }
}