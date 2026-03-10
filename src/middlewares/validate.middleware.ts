import { RequestHandler, type NextFunction, type Request, type Response, } from 'express';
import type Joi from 'joi';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';

export enum ValidationSource {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params',
}

export const validate = <ReqParams, ReqBody, ReqQuery>(
  schema: Joi.ObjectSchema,
  source: ValidationSource
): RequestHandler<ReqParams, never, ReqBody, ReqQuery> => {
  return (
    req: Request<ReqParams, never, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ): void => {
    logger.debug(
      { data: req[source] },
      `Validation middleware: Validating request ${source}`
    );

    const objToValidate: ReqParams | ReqBody | ReqQuery = req[source];
    if (!objToValidate) {
      logger.warn(`Validation middleware: No data found in request ${source}`);
      next(new Error('Validation type not supported'));
      return;
    }

    const { error, value } = schema.validate(objToValidate, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      logger.warn(
        { errors: error.details.map((detail) => detail.message) },
        'Validation middleware: Validation errors'
      );

      const responseObj = {
        error: 'Validation failed',
        details: error.details.map((detail) => detail.message),
      };
      res.status(httpStatus.BAD_REQUEST).json(responseObj);
      return;
    }

    if (source === ValidationSource.BODY) {
      req.body = value;
    } else if (source === ValidationSource.PARAMS) {
      req.params = value;
    } else if (source === ValidationSource.QUERY) {
      req.query = value;
    }

    logger.debug('Validation middleware: Validation successful');
    next();
  };
};
