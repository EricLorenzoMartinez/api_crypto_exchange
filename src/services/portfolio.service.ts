import { TransactionRepository } from '../repositories/transaction.repository';
import { CoinCapProvider } from '../providers/coincap.provider';
import { IPortfolioItem } from '../interfaces/portfolio.interface';
import logger from '../config/logger';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';

export class PortfolioService {
    private transactionRepository: TransactionRepository;
    private coinCapProvider: CoinCapProvider;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.coinCapProvider = new CoinCapProvider();
    }

    async getPortfolio(userId: string): Promise<IPortfolioItem[]> {
        logger.debug(`Service: Calculating portfolio for user ${userId}`);

        const rawPortfolio = await this.transactionRepository.getPortfolioByUserId(userId);

        const portfolio: IPortfolioItem[] = await Promise.all(
            rawPortfolio.map(async (item) => {
                const coincapId = item.assetDetails.coincapId;
                
                const currentPriceUsd = await this.coinCapProvider.getAssetPrice(coincapId);

                if (currentPriceUsd === null) {
                    logger.error(`Failed to fetch current price for ${coincapId}`);
                    throw new AppError('Service Unavailable (CoinCap API Error)', httpStatus.SERVICE_UNAVAILABLE);
                }

                return {
                    asset: {
                        id: item.assetDetails._id.toString(),
                        symbol: item.assetDetails.symbol,
                        name: item.assetDetails.name,
                    },
                    netQuantity: item.netQuantity,
                    currentPriceUsd: currentPriceUsd,
                    currentValueUsd: item.netQuantity * currentPriceUsd
                };
            })
        );

        logger.info(`Service: Portfolio calculated successfully for user ${userId}`);
        return portfolio;
    }
}