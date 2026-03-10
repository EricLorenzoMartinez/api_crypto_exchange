import { IAsset, IAssetCreate } from '../interfaces/asset.interface';
import { AssetResponseDto, CreateAssetDto } from '../dtos/asset.dto';

export const toAssetResponse = (asset: IAsset): AssetResponseDto => ({
    id: asset.id,
    symbol: asset.symbol,
    name: asset.name,
    coincapId: asset.coincapId,
    lastPriceUsd: asset.lastPriceUsd,
    lastPriceAt: asset.lastPriceAt,
});

export const toCreateAssetInput = (dto: CreateAssetDto): IAssetCreate => ({
    symbol: dto.symbol,
    name: dto.name,
    coincapId: dto.coincapId,
});