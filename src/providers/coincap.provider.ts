import { COINCAP_API_URL } from '../config/config';
import logger from '../config/logger';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';

export class CoinCapProvider {
    private readonly apiUrl: string = COINCAP_API_URL;

    async getAssetPrice(coincapId: string): Promise<number | null> {
        try {
            logger.debug(`CoinCapProvider: Fetching price for asset with coincapId: ${coincapId}`);
            const response = await fetch(`${this.apiUrl}/assets/${coincapId}`);

            if (!response.ok) {
                logger.error(`CoinCapProvider: Failed to fetch price for asset with coincapId: ${coincapId}. Status: ${response.status}`);
                return null;
            }

            const data = await response.json();
            const priceUsd = parseFloat(data.data.priceUsd);
            logger.debug(`CoinCapProvider: Fetched price for asset with coincapId: ${coincapId} is ${priceUsd}`);
            return priceUsd;
        } catch (error: unknown) {
            logger.error(`CoinCapProvider: Error fetching price for asset with coincapId: ${coincapId}. Error: ${error}`);
            throw new AppError(`Failed to fetch asset price`, httpStatus.SERVICE_UNAVAILABLE);
        }
    }
}