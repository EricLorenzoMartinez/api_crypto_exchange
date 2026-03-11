import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { AppError } from '../utils/application.error';
import { UserRepository } from '../repositories/user.repository';
import { PasswordHelper } from '../utils/password.helper';
import { TokenHelper } from '../utils/token.helper';
import { IAuthResult, ILogin } from '../interfaces/auth.interface';

export class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  login = async (data: ILogin): Promise<IAuthResult> => {
    logger.debug(`AuthService: Attempting login for email: ${data.email}`);
    const user = await this.userRepository.getByEmail(data.email);
    const invalidCredentialsError = new AppError(
      'Invalid credentials',
      httpStatus.UNAUTHORIZED
    );
    if (!user) {
      logger.warn(`AuthService: User not found for email: ${data.email}`);
      throw invalidCredentialsError;
    }
    if (user.isBlocked) {
      logger.warn(`AuthService: User with email ${data.email} is blocked`);
      throw new AppError('User is blocked', httpStatus.FORBIDDEN);
    }
    const isPasswordValid = await PasswordHelper.comparePasswords(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      logger.warn(`AuthService: Invalid password for email: ${data.email}`);
      throw invalidCredentialsError;
    }
    const token = TokenHelper.generateToken({ id: user.id });
    logger.info(`AuthService: Login successful for email: ${data.email}`);
    return { user, accessToken: token };
  };
}
