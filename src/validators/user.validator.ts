import Joi from 'joi';

export class UserValidator {
  private static readonly id = Joi.string().trim();

  private static readonly email = Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } });

  private static readonly name = Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[\p{L}\p{M} ]+$/u);

  private static readonly password = Joi.string().trim();

  private static readonly birthday = Joi.date().iso();

  private static readonly isBlocked = Joi.boolean()
    .truthy(1, '1', 'true', 'yes', 'y', 'sí', 'si')
    .falsy(0, '0', 'false', 'no', 'n');

  private static readonly skip = Joi.number().integer().min(0);
  private static readonly limit = Joi.number().integer().min(1).max(100);

  static readonly userCreateSchema = Joi.object({
    name: UserValidator.name.required(),
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
    birthday: UserValidator.birthday.required(),
  });

  static readonly userLoginSchema = Joi.object({
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
  });
}
