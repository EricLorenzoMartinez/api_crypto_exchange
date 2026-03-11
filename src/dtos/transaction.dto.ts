import { IAsset } from "../interfaces/asset.interface";

export interface TransactionResponseDto {
    id: string;
    userId: string;
    assetId: string | IAsset;
    type: 'BUY' | 'SELL';
    quantity: number;
    priceUsdAtExecution: number;
    executedAt?: Date;
    notes?: string;
}

export interface CreateTransactionDto {
    assetId: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    notes?: string;
}

export interface UpdateTransactionDto {
    executedAt?: Date;
    notes?: string;
}