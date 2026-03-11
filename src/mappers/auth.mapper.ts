import { AuthResponseDto, LoginDto } from '../dtos/auth.dto';
import { IAuthResult, ILogin } from '../interfaces/auth.interface';

export const toLoginInput = (body: LoginDto): ILogin => ({
  email: body.email,
  password: body.password,
});

export const toAuthResponse = (auth: IAuthResult): AuthResponseDto => ({
  user: {
    id: auth.user.id,
    name: auth.user.name,
    email: auth.user.email,
    birthday: auth.user.birthday.toISOString(),
    isBlocked: auth.user.isBlocked,
    createdAt: auth.user.createdAt.toISOString(),
    updatedAt: auth.user.updatedAt.toISOString(),
  },
  accessToken: auth.accessToken,
});
