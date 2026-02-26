import { Document } from 'mongoose';

export interface IAsset extends Document {
    symbol: string;
    name: string;
    coincapId: string;
    lastPriceUsd?: number;
    lastPriceAt?: Date;
}