import { CreateUserDto, UserResponseDto } from '../dtos/user.dto';
import { IUser, IUserCreate } from '../interfaces/user.interface';

export const toUserResponse = (u: IUser): UserResponseDto => ({
  id: u.id,
  name: u.name,
  email: u.email,
  birthday: u.birthday.toISOString(),
  isBlocked: u.isBlocked,
  createdAt: u.createdAt.toISOString(),
  updatedAt: u.updatedAt.toISOString(),
});

export const toCreateUserInput = (dto: CreateUserDto): IUserCreate => ({
  name: dto.name,
  email: dto.email,
  password: dto.password,
  birthday: new Date(dto.birthday),
  isBlocked: false,
});