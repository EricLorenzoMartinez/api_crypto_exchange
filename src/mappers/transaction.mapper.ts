import { ITransaction, ITransactionCreate, ITransactionUpdate } from '../interfaces/transaction.interface';
import { TransactionResponseDto, CreateTransactionDto, UpdateTransactionDto } from '../dtos/transaction.dto';

export const toTransactionResponse = (transaction: ITransaction): TransactionResponseDto => ({
    id: transaction.id!,
    userId: transaction.userId,
    assetId: transaction.assetId,
    type: transaction.type,
    quantity: transaction.quantity,
    priceUsdAtExecution: transaction.priceUsdAtExecution,
});

export const toCreateTransactionInput = (dto: CreateTransactionDto): ITransactionCreate => ({
    assetId: dto.assetId,
    type: dto.type,
    quantity: dto.quantity,
});

export const toUpdateTransactionInput = (dto: UpdateTransactionDto): ITransactionUpdate => ({
    notes: dto.notes,
    executedAt: dto.executedAt,
});