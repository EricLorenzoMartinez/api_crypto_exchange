import { IUser } from './user.interface';

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthResult {
  user: IUser;
  accessToken: string;
}
