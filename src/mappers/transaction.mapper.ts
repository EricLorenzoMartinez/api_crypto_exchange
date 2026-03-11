import { ITransaction, ITransactionPopulated, ITransactionCreate, ITransactionUpdate } from '../interfaces/transaction.interface';
import { TransactionResponseDto, CreateTransactionDto, UpdateTransactionDto } from '../dtos/transaction.dto';

export const toTransactionResponse = (transaction: ITransaction | ITransactionPopulated): TransactionResponseDto => ({
    id: transaction.id!,
    userId: transaction.userId,
    assetId: transaction.assetId,
    type: transaction.type,
    quantity: transaction.quantity,
    priceUsdAtExecution: transaction.priceUsdAtExecution,
    executedAt: transaction.executedAt,
    notes: transaction.notes,
});

export const toCreateTransactionInput = (dto: CreateTransactionDto): ITransactionCreate => ({
    assetId: dto.assetId,
    type: dto.type,
    quantity: dto.quantity,
    notes: dto.notes,
});

export const toUpdateTransactionInput = (dto: UpdateTransactionDto): ITransactionUpdate => ({
    notes: dto.notes,
    executedAt: dto.executedAt,
});