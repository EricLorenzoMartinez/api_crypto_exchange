export interface IAsset {
    id: string;
    symbol: string;
    name: string;
    coincapId: string;
    lastPriceUsd?: number;
    lastPriceAt?: Date;
}