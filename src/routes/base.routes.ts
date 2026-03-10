import express, { Router } from 'express';
import { assetRouter } from './asset.routes';

export const baseRouter = Router();

baseRouter.use(express.json());

baseRouter.use('/assets', assetRouter);
