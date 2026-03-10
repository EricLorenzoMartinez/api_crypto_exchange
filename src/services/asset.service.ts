import { AssetRepository } from '../repositories/asset.repository';
import { IAsset, IAssetCreate } from '../interfaces/asset.interface';
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

    async createAsset(data: Partial<IAssetCreate>): Promise<IAsset> {
        const existingAsset = await this.repository.getAll({ coincapId: data.coincapId });
        if (existingAsset.length > 0) {
            logger.warn(`Asset with coincapId ${data.coincapId} already exists`);
            throw new AppError(`Asset already exists`, httpStatus.CONFLICT, { coincapId: data.coincapId });
        }
        const createdAsset = await this.repository.create(data);
        if (!createdAsset) {
            logger.error(`Failed to create asset with data: ${JSON.stringify(data)}`);
            throw new AppError(`Failed to create asset`, httpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info(`Created asset with coincapId: ${createdAsset.coincapId}`);
        return createdAsset;
    }
}