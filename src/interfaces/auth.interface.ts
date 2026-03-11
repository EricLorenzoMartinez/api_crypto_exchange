import { IUser } from './user.interface';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthResult {
  user: IUser;
  accessToken: string;
}

export interface IAuthRequest extends Request {
  user?: string | JwtPayload;
}
