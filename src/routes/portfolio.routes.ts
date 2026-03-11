import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { checkToken } from '../middlewares/auth.middleware';

const portfolioController = new PortfolioController();
export const portfolioRouter = Router();

portfolioRouter.get('/', checkToken, portfolioController.getPortfolio);