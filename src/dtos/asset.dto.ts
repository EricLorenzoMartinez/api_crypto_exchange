export interface AssetResponseDto {
    id: string;
    symbol: string;
    name: string;
    coincapId: string;
    lastPriceUsd?: number;
    lastPriceAt?: Date;
}

export interface CreateAssetDto {
    symbol: string;
    name: string;
    coincapId: string;
}