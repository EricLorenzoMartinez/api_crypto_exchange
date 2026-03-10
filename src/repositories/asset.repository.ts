import { IAsset } from '../interfaces/asset.interface';
import { AssetModel, IAssetModel } from '../models/asset.model';
import { BaseRepository } from './base.repository';
import logger from '../config/logger'


export class AssetRepository extends BaseRepository<IAsset, IAssetModel> {
    constructor() {
        super(AssetModel, 'Asset');
    }

    async getAssetByCoinCapId(coincapId: string): Promise<IAsset | null> {
        logger.debug(`Repository: Finding Asset by coincapId: ${coincapId}`);
        const asset = await this.model.findOne({ coincapId });
        if (!asset) {
            logger.debug(`Repository: Asset with CoinCap ID ${coincapId} not found`);
            return null;
        }
        logger.debug(`Repository: Found Asset with CoinCap ID ${coincapId}`);
        return this.transformId(asset);
    }
}