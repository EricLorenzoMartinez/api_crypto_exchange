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