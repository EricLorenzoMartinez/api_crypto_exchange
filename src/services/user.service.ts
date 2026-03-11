import { UserRepository } from '../repositories/user.repository';
import { IUser, IUserCreate } from '../interfaces/user.interface';
import { AppError } from '../utils/application.error';
import { httpStatus } from '../config/httpStatusCodes';
import logger from '../config/logger';
import { PasswordHelper } from '../utils/password.helper';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    private readonly getAge = (birthday: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthday.getDate())
        ) {
        age--;
        }
        logger.debug({ birthday, age }, 'Calculated age');
        return age;
    };

    async create(data: IUserCreate): Promise<IUser> {
        const existingUser = await this.userRepository.getByEmail(data.email);
        
        if (existingUser) {
            logger.warn(`User with email ${data.email} already exists`);
            throw new AppError('A user with this email already exists', httpStatus.CONFLICT, { email: data.email });
        }
        
        if (this.getAge(data.birthday) < 18) {
            logger.warn({ birthday: data.birthday }, 'User is under 18 years old');
            throw new AppError('User must be at least 18 years old', httpStatus.BAD_REQUEST, { birthday: data.birthday });
        }
        
        data.password = await PasswordHelper.hashPassword(data.password);
        const createdUser = await this.userRepository.create(data);
        
        if (!createdUser) {
            logger.warn('User creation failed');
            throw new AppError('User creation failed', httpStatus.INTERNAL_SERVER_ERROR);
        }

        logger.info(`User created successfully with email ${data.email}`);
        return createdUser;
    };
}