import { TransactionRepository } from '../repositories/transaction.repository';
import { ITransaction, ITransactionCreate, ITransactionUpdate } from '../interfaces/transaction.interface';
import logger from '../config/logger';
import { AssetService } from './asset.service';
import { CoinCapProvider } from '../providers/coincap.provider';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';

export class TransactionService {
    private readonly transactionRepository: TransactionRepository;
    private readonly assetService: AssetService;
    private readonly coinCapProvider: CoinCapProvider;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.assetService = new AssetService();
        this.coinCapProvider = new CoinCapProvider();
    }

    async getUserTransactions(userId: string, pagination: { skip: number; limit: number }): Promise<ITransaction[]> {
        logger.debug(`Service: Getting all transactions for user ${userId} with pagination: ${JSON.stringify(pagination)}`);
        return this.transactionRepository.getAll({ userId }, pagination);
    }

    async getTransactionById(userId: string, transactionId: string): Promise<ITransaction> {
        logger.debug(`Service: Getting transaction by ID ${transactionId} for user ${userId}`);
        const transaction = await this.transactionRepository.getByIdWithAsset(transactionId);
        if (!transaction) {
            logger.warn(`Service: Transaction with ID ${transactionId} not found for user ${userId}`);
            throw new AppError('Transaction not found', httpStatus.NOT_FOUND);
        }
        if (userId !== transaction.userId) {
            logger.warn(`Service: User ${userId} is not authorized to access transaction with ID ${transactionId}`);
            throw new AppError('Unauthorized access to transaction', httpStatus.FORBIDDEN);
        }
        logger.debug(`Service: Found transaction with ID ${transactionId} for user ${userId}`);
        return transaction;
    }

    async createTransaction(userId: string, data: ITransactionCreate): Promise<ITransaction> {
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

        const createdTransaction = await this.transactionRepository.create(transactionData);
        if (!createdTransaction) {
            logger.error(`Service: Failed to create transaction for user ${userId} with data: ${JSON.stringify(transactionData)}`);
            throw new AppError('Failed to create transaction', httpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info(`Service: Created transaction for user ${userId} on asset ${asset.coincapId} with quantity ${data.quantity} at price ${price}`);
        return createdTransaction;
    }

    async updateTransaction(userId: string, transactionId: string, data: ITransactionUpdate): Promise<ITransaction> {
        const transactionToUpdate = await this.transactionRepository.getById(transactionId);
        if (!transactionToUpdate) {
            logger.warn(`Service: Transaction with ID ${transactionId} not found for user ${userId}`);
            throw new AppError('Transaction not found', httpStatus.NOT_FOUND);
        }
        if (userId !== transactionToUpdate.userId) {
            logger.warn(`Service: User ${userId} is not authorized to update transaction with ID ${transactionId}`);
            throw new AppError('Unauthorized access to transaction', httpStatus.FORBIDDEN);
        }

        const updatedTransaction = await this.transactionRepository.update(transactionId, data);
        if (!updatedTransaction) {
            logger.error(`Service: Failed to update transaction with ID ${transactionId} for user ${userId} with data: ${JSON.stringify(data)}`);
            throw new AppError('Failed to update transaction', httpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info(`Service: Updated transaction with ID ${transactionId} for user ${userId} with data: ${JSON.stringify(data)}`);
        return updatedTransaction;
    }

    async deleteTransaction(userId: string, transactionId: string): Promise<void> {
        const transactionToDelete = await this.transactionRepository.getById(transactionId);
        if (!transactionToDelete) {
            logger.warn(`Service: Transaction with ID ${transactionId} not found for user ${userId}`);
            throw new AppError('Transaction not found', httpStatus.NOT_FOUND);
        }
        if (userId !== transactionToDelete.userId) {
            logger.warn(`Service: User ${userId} is not authorized to delete transaction with ID ${transactionId}`);
            throw new AppError('Unauthorized access to transaction', httpStatus.FORBIDDEN);
        }
        
        const deletedTransaction = await this.transactionRepository.delete(transactionId);
        if (!deletedTransaction) {
            logger.error(`Service: Failed to delete transaction with ID ${transactionId} for user ${userId}`);
            throw new AppError('Failed to delete transaction', httpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info(`Service: Deleted transaction with ID ${transactionId} for user ${userId}`);
    }
}