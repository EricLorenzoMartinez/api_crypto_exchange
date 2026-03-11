import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { validate, ValidationSource } from '../middlewares/validate.middleware';
import { createTransactionSchema, updateTransactionSchema, transactionIdSchema } from '../validators/transaction.validator';
import { checkToken } from '../middlewares/auth.middleware';

const transactionController = new TransactionController();
export const transactionRouter = Router();

transactionRouter.get('/', checkToken, transactionController.getUserTransactions);
transactionRouter.get(
    '/:id',
    checkToken,
    validate(transactionIdSchema, ValidationSource.PARAMS),
    transactionController.getTransactionById
);

transactionRouter.post(
    '/',
    checkToken,
    validate(createTransactionSchema, ValidationSource.BODY),
    transactionController.createTransaction
);

transactionRouter.patch(
    '/:id',
    checkToken,
    validate(transactionIdSchema, ValidationSource.PARAMS),
    validate(updateTransactionSchema, ValidationSource.BODY),
    transactionController.updateTransaction
);

transactionRouter.delete(
    '/:id',
    checkToken,
    validate(transactionIdSchema, ValidationSource.PARAMS),
    transactionController.deleteTransaction
);