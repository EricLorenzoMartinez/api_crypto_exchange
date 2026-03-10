import { TransactionRepository } from '../repositories/transaction.repository';
import { AssetService } from './asset.service';
import { CoinCapProvider } from '../providers/coincap.provider';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';

export class TransactionService {
    private readonly transactionRepo: TransactionRepository;
    private readonly assetService: AssetService;
    private readonly coinCapProvider: CoinCapProvider;

    constructor() {
        this.transactionRepo = new TransactionRepository();
        this.assetService = new AssetService();
        this.coinCapProvider = new CoinCapProvider();
    }

    async createTransaction(userId: string, data: CreateTransactionDto) {
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