import { IAsset } from './asset.interface';

export interface ITransaction {
    id?: string;
    userId: string;
    assetId: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    priceUsdAtExecution: number;
    executedAt?: Date;
    notes?: string;
}

export interface ITransactionPopulated extends Omit<ITransaction, 'assetId'> {
    assetId: IAsset;
}

type SystemKeys = 'id' | 'userId' | 'priceUsdAtExecution';
type CreationKeys = 'assetId' | 'type' | 'quantity';

export type ITransactionCreate = Omit<ITransaction, SystemKeys | 'executedAt'>;
export type ITransactionUpdate = Omit<ITransaction, SystemKeys | CreationKeys>;