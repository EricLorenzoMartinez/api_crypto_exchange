import mongoose from 'mongoose';
import { IAsset } from '../interfaces/asset.interface';

const assetSchema = new mongoose.Schema(
    {
        symbol: { type: String, required: true },
        name: { type: String, required: true },
        coincapId: { type: String, required: true, unique: true },
        lastPriceUsd: { type: Number, required: false },
        lastPriceAt: { type: Date, required: false },
    },
    { timestamps: true }
);

export const AssetModel = mongoose.model<IAsset>('Asset', assetSchema);