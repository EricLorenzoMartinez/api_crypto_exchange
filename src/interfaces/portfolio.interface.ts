import { Types } from 'mongoose';

export interface IPortfolioAsset {
    id: string;
    symbol: string;
    name: string;
}

export interface IPortfolioItem {
    asset: IPortfolioAsset;
    netQuantity: number;
    currentPriceUsd: number;
    currentValueUsd: number;
}

export interface IPortfolioAggregationRaw {
    _id: Types.ObjectId;
    netQuantity: number;
    assetDetails: {
        _id: Types.ObjectId;
        symbol: string;
        name: string;
        coincapId: string;
        lastPriceUsd?: number;
        lastPriceAt?: Date;
    };
}