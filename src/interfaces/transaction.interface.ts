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

type SystemKeys = 'id' | 'userId' | 'priceUsdAtExecution' | 'executedAt';
type EditableFilm = Omit<ITransaction, SystemKeys>;

export type ITransactionCreate = EditableFilm;