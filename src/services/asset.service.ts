import { AssetRepository } from '../repositories/asset.repository';

export class AssetService {
    private readonly repository: AssetRepository;

    constructor() {
        this.repository = new AssetRepository();
    }
}

export default new AssetService();