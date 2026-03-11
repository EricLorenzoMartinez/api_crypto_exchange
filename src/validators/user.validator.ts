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

  static readonly userIdSchema = Joi.object({
    id: UserValidator.id.required(),
  });

  static readonly userPaginationSchema = Joi.object({
    skip: UserValidator.skip,
    limit: UserValidator.limit,
  }).and('skip', 'limit');

  static readonly userCreateSchema = Joi.object({
    name: UserValidator.name.required(),
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
    birthday: UserValidator.birthday.required(),
  });

  static readonly userUpdateSchema = Joi.object({
    name: UserValidator.name,
    email: UserValidator.email,
    password: UserValidator.password,
    birthday: UserValidator.birthday,
    isBlocked: UserValidator.isBlocked,
  }).min(1);

  static readonly userLoginSchema = Joi.object({
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
  });
}
