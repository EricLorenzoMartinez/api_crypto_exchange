export interface AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
