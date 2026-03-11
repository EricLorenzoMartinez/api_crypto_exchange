import express, { Router } from 'express';
import { assetRouter } from './asset.routes';
import { transactionRouter } from './transaction.routes';

export const baseRouter = Router();

baseRouter.use(express.json());

baseRouter.use('/assets', assetRouter);
baseRouter.use('/transactions', transactionRouter);
