import { type Request, type Response } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { AppError } from '../utils/application.error';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response
): Response => {
  logger.error(
    { error: err, path: req.path, method: req.method },
    'An error occurred'
  );
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error:
      'An unexpected error occurred, please contact the system administrator.',
  });
};