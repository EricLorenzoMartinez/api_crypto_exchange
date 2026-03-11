import { Request, Response, NextFunction } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { TokenHelper } from '../utils/token.helper';
import { AppError } from '../utils/application.error';
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug({ path: req.path, method: req.method }, 'checkToken middleware: Received authentication request');

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('checkToken middleware: No token provided');
    next(new AppError('You must be logged in to access this resource.', httpStatus.UNAUTHORIZED));
    return;
  }
  try {
    const decoded = TokenHelper.verifyToken(token);
    logger.debug(decoded, `DECODED TOKEN: ${JSON.stringify(decoded)}`);
    (req as any).user = decoded;
    logger.info('checkToken middleware: Token verified successfully');
    next();
  } catch (error) {
    if (error instanceof NotBeforeError) {
      logger.warn('checkToken middleware: Token is not active yet');
      return next(new AppError('Token not active yet. Please wait.', httpStatus.UNAUTHORIZED));
    }

    if (error instanceof TokenExpiredError) {
      logger.warn('checkToken middleware: Token expired');
      return next(new AppError('Token expired.', httpStatus.UNAUTHORIZED));
    }
    logger.warn(error, 'checkToken middleware: Invalid token');
    next(new AppError('Invalid token.', httpStatus.UNAUTHORIZED));
  }
};
