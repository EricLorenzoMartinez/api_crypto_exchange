import { AssetRepository } from '../repositories/asset.repository';
import { IAsset } from '../interfaces/asset.interface';
import logger from '../config/logger';

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
}