import { IAsset } from '../interfaces/asset.interface';
import { AssetModel, IAssetModel } from '../models/asset.model';
import { BaseRepository } from './base.repository';


export class AssetRepository extends BaseRepository<IAsset, IAssetModel> {
    constructor() {
        super(AssetModel, 'Asset');
    }
}