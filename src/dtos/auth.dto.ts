export interface AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    birthday: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
