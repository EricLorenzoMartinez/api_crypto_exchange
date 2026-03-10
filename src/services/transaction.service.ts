import { TransactionRepository } from '../repositories/transaction.repository';
import { ITransaction, ITransactionCreate } from '../interfaces/transaction.interface';
import logger from '../config/logger';
import { AssetService } from './asset.service';
import { CoinCapProvider } from '../providers/coincap.provider';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';

export class TransactionService {
    private readonly transactionRepo: TransactionRepository;
    private readonly assetService: AssetService;
    private readonly coinCapProvider: CoinCapProvider;

    constructor() {
        this.transactionRepo = new TransactionRepository();
        this.assetService = new AssetService();
        this.coinCapProvider = new CoinCapProvider();
    }

    async getAllTransactions(userId: string, pagination: { skip: number; limit: number }): Promise<ITransaction[]> {
        logger.debug(`Service: Getting all transactions for user ${userId} with pagination: ${JSON.stringify(pagination)}`);
        return this.transactionRepo.getAll({ userId }, pagination);
    }

    async getTransactionById(userId: string, transactionId: string): Promise<ITransaction> {
        logger.debug(`Service: Getting transaction by ID ${transactionId} for user ${userId}`);
        const transaction = await this.transactionRepo.getById(transactionId);
        if (!transaction || transaction.userId !== userId) {
            logger.warn(`Service: Transaction with ID ${transactionId} not found for user ${userId}`);
            throw new AppError('Transaction not found', httpStatus.NOT_FOUND);
        }
        return transaction;
    }

    async createTransaction(userId: string, data: Partial<ITransactionCreate>): Promise<ITransaction> {
        const asset = await this.assetService.getAssetById(data.assetId);
        const price = await this.coinCapProvider.getAssetPrice(asset.coincapId);
        
        if (price === null) {
            logger.error(`Service: Failed to fetch current price for asset with coincapId: ${asset.coincapId}`);
            throw new AppError('Failed to retrieve asset price', httpStatus.SERVICE_UNAVAILABLE, { assetId: data.assetId });
        }

        const transactionData = {
            userId: userId,
            assetId: data.assetId,
            type: data.type,
            quantity: data.quantity,
            notes: data.notes,
            priceUsdAtExecution: price
        };

        const createdTransaction = await this.transactionRepo.create(transactionData);
        if (!createdTransaction) {
            logger.error(`Service: Failed to create transaction for user ${userId} with data: ${JSON.stringify(transactionData)}`);
            throw new AppError('Failed to create transaction', httpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info(`Service: Created transaction for user ${userId} on asset ${asset.coincapId} with quantity ${data.quantity} at price ${price}`);
        return createdTransaction;
    }
}