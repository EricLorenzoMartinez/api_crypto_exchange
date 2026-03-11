import { type Request, type Response, type NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { TransactionService } from '../services/transaction.service';
import { toTransactionResponse, toCreateTransactionInput, toUpdateTransactionInput } from '../mappers/transaction.mapper';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { AppError } from '../utils/application.error';

export class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    getUserTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        logger.debug(`Controller: Received request to get user transactions with query: ${JSON.stringify(req.query)}`);
        try {
            const { skip = 0, limit = 0 } = req.query;
            const pagination = {
                skip: parseInt(skip as string, 10),
                limit: parseInt(limit as string, 10),
            };
            const userId = "<USER_ID>"; //TODO: Get from auth when done
            const transactions = await this.transactionService.getUserTransactions(userId, pagination);
            const data = transactions.map(toTransactionResponse);
            const response = {
                message: 'Transactions retrieved successfully',
                length: data.length,
                data,
            };
            res.send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug('Controller: Error fetching transactions');
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving transactions', httpStatus.INTERNAL_SERVER_ERROR, {originalError: appError});
            }
            next(appError);
        }
    };

    getTransactionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const transactionId = req.params.id;
        logger.debug(`Controller: Received request to get transaction by ID: ${transactionId}`);
        try {
            const userId = "<USER_ID>"; //TODO: Get from auth when done
            const transaction = await this.transactionService.getTransactionById(userId, transactionId);
            const data = toTransactionResponse(transaction);
            
            const response = {
                message: 'Transaction retrieved successfully',
                data,
            };
            res.send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug('Controller: Error fetching transaction');
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving transaction', httpStatus.INTERNAL_SERVER_ERROR, {originalError: appError});
            }
            next(appError);
        }
    };

    createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const body = req.body as CreateTransactionDto;
        logger.debug(`Controller: Received request to create transaction with body: ${JSON.stringify(body)}`);
        try {
            const userId = "<USER_ID>"; //TODO: Get from auth when done
            const input = toCreateTransactionInput(body);
            const transaction = await this.transactionService.createTransaction(userId, input);
            const data = toTransactionResponse(transaction);

            const response = {
                message: 'Transaction created successfully',
                data,
            };
            res.status(httpStatus.CREATED).send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug('Controller: Error creating transaction');
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while creating transaction', httpStatus.INTERNAL_SERVER_ERROR, {originalError: appError});
            }
            next(appError);
        }
    };
}