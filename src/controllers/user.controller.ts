import { type NextFunction, type Request, type Response } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { toCreateUserInput, toUserResponse } from '../mappers/user.mapper';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { AppError } from '../utils/application.error';

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as CreateUserDto;
    logger.debug({ body }, 'Controller: Received request to create a new user');
    try {
      if (!body) {
        throw new AppError('Request body is missing', httpStatus.BAD_REQUEST);
      }
      if (!body.name || !body.email || !body.password || !body.birthday) {
        throw new AppError('Missing required fields: name, email, password, birthday', httpStatus.BAD_REQUEST);
      }
      const userToCreate = toCreateUserInput(body);
      const user = await this.userService.create(userToCreate);
      const data = toUserResponse(user);

      const response = {
        message: 'User created successfully',
        data,
      };
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      let appError = error as unknown;
      logger.debug({ body }, 'Controller: Error creating user');
      if (!(appError instanceof AppError)) {
        appError = new AppError('Error creating user', httpStatus.INTERNAL_SERVER_ERROR, { body: req.body, originalError: appError });
      }
      next(appError);
    }
  };
}
