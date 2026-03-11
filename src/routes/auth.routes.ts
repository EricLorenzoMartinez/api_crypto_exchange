import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserValidator } from '../validators/user.validator';
import { validate, ValidationSource } from '../middlewares/validate.middleware';

const authController = new AuthController();
export const authRouter = Router();

authRouter.post(
  '/register',
  validate(UserValidator.userCreateSchema, ValidationSource.BODY),
  authController.register
);

authRouter.post(
  '/login',
  validate(UserValidator.userLoginSchema, ValidationSource.BODY),
  authController.login
);
