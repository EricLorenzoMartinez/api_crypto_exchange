import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { AppError } from './application.error';

export function logError(err: unknown, msg: string): void {
  if (err instanceof Error) {
    logger.error({ message: err.message, stack: err.stack }, msg);
  } else {
    logger.error({ err }, msg);
  }
}

export function handleControllerError(
  err: unknown,
  msg: string,
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR
): AppError {
  logger.debug(`Controller: ${msg}`);

  if (err instanceof AppError) {
    return err;
  }

  if (err instanceof Error) {
    logger.error({ message: err.message, stack: err.stack }, msg);
  } else {
    logger.error({ err }, msg);
  }

  return new AppError(msg, statusCode, { originalError: err });
}
