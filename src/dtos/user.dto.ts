export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  birthday: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  birthday: string;
}