import { AssetRepository } from '../repositories/asset.repository';
import { IAsset } from '../interfaces/asset.interface';
import logger from '../config/logger';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';

export class AssetService {
    private readonly repository: AssetRepository;

    constructor() {
        this.repository = new AssetRepository();
    }

    async getAllAssets(pagination: {
        skip: number;
        limit: number;
    }): Promise<IAsset[]> {
        logger.debug(`Service: Getting all assets with pagination: ${JSON.stringify(pagination)}`);
        return this.repository.getAll({}, pagination);
    }

    async getAssetById(id: string): Promise<IAsset | null> {
        logger.debug(`Service: Getting asset by id: ${id}`);
        const asset = await this.repository.getById(id);
        if (!asset) {
            logger.warn(`Asset with id ${id} not found`);
            throw new AppError(`Asset not found`, httpStatus.NOT_FOUND, { id });
        }
        return asset;
    }
}