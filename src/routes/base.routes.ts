import express, { Router } from 'express';
import { assetRouter } from './asset.routes';
import { transactionRouter } from './transaction.routes';
import { authRouter } from './auth.routes';
import { portfolioRouter } from './portfolio.routes';

export const baseRouter = Router();

baseRouter.use(express.json());

baseRouter.use('/assets', assetRouter);
baseRouter.use('/transactions', transactionRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/portfolio', portfolioRouter)