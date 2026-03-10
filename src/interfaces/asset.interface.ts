export interface IAsset {
    id: string;
    symbol: string;
    name: string;
    coincapId: string;
    lastPriceUsd?: number;
    lastPriceAt?: Date;
}

type SystemKeys = 'id' | 'lastPriceUsd' | 'lastPriceAt';

export type IAssetCreate = Omit<IAsset, SystemKeys>;