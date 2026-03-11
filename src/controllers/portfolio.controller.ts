import { Request, Response, NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { PortfolioService } from '../services/portfolio.service';
import { AppError } from '../utils/application.error';
import { IAuthRequest } from '../interfaces/auth.interface';

export class PortfolioController {
    private portfolioService: PortfolioService;

    constructor() {
        this.portfolioService = new PortfolioService();
    }

    getPortfolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        logger.debug('Controller: Received request to fetch portfolio');
        try {
            const userId = ((req as IAuthRequest).user as { id: string }).id;
            
            const portfolio = await this.portfolioService.getPortfolio(userId);
            
            const response = {
                message: 'Portfolio retrieved successfully',
                data: portfolio,
            };
            
            res.status(httpStatus.OK).send(response);
        } catch (error) {
            let appError = error as unknown;
            logger.debug('Controller: Error fetching portfolio');
            if (!(appError instanceof AppError)) {
                appError = new AppError('Error occurred while retrieving portfolio', httpStatus.INTERNAL_SERVER_ERROR, { originalError: appError });
            }
            next(appError);
        }
    };
}