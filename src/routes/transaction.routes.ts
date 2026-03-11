import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { validate, ValidationSource } from '../middlewares/validate.middleware';
import { createTransactionSchema, updateTransactionSchema, transactionIdSchema } from '../validators/transaction.validator';

const transactionController = new TransactionController();
export const transactionRouter = Router();

transactionRouter.get('/', transactionController.getUserTransactions);
transactionRouter.get(
    '/:id',
    validate(transactionIdSchema, ValidationSource.PARAMS),
    transactionController.getTransactionById
);

transactionRouter.post(
    '/',
    validate(createTransactionSchema, ValidationSource.BODY),
    transactionController.createTransaction
);

transactionRouter.patch(
    '/:id',
    validate(transactionIdSchema, ValidationSource.PARAMS),
    validate(updateTransactionSchema, ValidationSource.BODY),
    transactionController.updateTransaction
);

transactionRouter.delete(
    '/:id',
    validate(transactionIdSchema, ValidationSource.PARAMS),
    transactionController.deleteTransaction
);