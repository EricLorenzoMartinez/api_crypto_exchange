import { NextFunction, type Request, type Response } from 'express';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth.dto';
import { CreateUserDto } from '../dtos/user.dto';
import { AppError } from '../utils/application.error';
import { toCreateUserInput, toUserResponse } from '../mappers/user.mapper';
import { toAuthResponse, toLoginInput } from '../mappers/auth.mapper';

export class AuthController {
  private readonly userService: UserService;
  private readonly authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as LoginDto;
    logger.debug(`Controller: Received login request for email: ${body.email}`);
    try {
      const userToLogin = toLoginInput(body);
      const authResult = await this.authService.login(userToLogin);
      const data = toAuthResponse(authResult);

      const response = {
        message: 'Login successful',
        data,
      };
      logger.info(`Controller: User logged in successfully: ${body.email}`);
      res.send(response);
    } catch (error) {
      let appError = error as unknown;
      logger.debug(`Controller: Error during login for email: ${body.email}`);
      if (!(appError instanceof AppError)) {
        appError = new AppError('Login failed', httpStatus.INTERNAL_SERVER_ERROR, { email: body.email, originalError: appError });
      }
      next(appError);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as CreateUserDto;
    logger.debug(`Controller: Received registration request for email: ${body.email}`);
    try {
      logger.debug(`User registration attempt: ${body.email}`);
      const userToRegister = toCreateUserInput(body);
      const user = await this.userService.create(userToRegister);
      const data = toUserResponse(user);

      const response = {
        message: 'User registered successfully',
        data,
      };
      logger.info(`Controller: User registered successfully: ${body.email}`);
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      let appError = error as unknown;
      logger.debug({ email: body.email }, 'Controller: Error during registration');
      if (!(appError instanceof AppError)) {
        appError = new AppError('Registration failed', httpStatus.INTERNAL_SERVER_ERROR, { email: body.email, originalError: appError });
      }
      next(appError);
    }
  };
}
