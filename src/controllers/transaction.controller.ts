import { type Request, type Response, type NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { TransactionService } from '../services/transaction.service';
import { toTransactionResponse, toCreateTransactionInput, toUpdateTransactionInput } from '../mappers/transaction.mapper';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { AppError } from '../utils/application.error';