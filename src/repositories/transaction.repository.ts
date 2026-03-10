import { ITransaction } from '../interfaces/transaction.interface';
import { TransactionModel, ITransactionModel } from '../models/transaction.model';
import { BaseRepository } from './base.repository';


export class TransactionRepository extends BaseRepository<ITransaction, ITransactionModel> {
    constructor() {
        super(TransactionModel, 'Transaction');
    }
}