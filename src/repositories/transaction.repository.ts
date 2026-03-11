import { ITransaction, ITransactionPopulated } from '../interfaces/transaction.interface';
import { TransactionModel, ITransactionModel } from '../models/transaction.model';
import { BaseRepository } from './base.repository';
import logger from '../config/logger';


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
}