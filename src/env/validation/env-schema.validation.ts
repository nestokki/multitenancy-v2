import Joi from 'joi';

const validateHostDomain = Joi.alternatives()
  .try(
    Joi.string().valid('localhost'), // 로컬
    Joi.string().ip({ version: ['ipv4', 'ipv6'] }), // IP
    Joi.string().hostname(), // 도메인
    Joi.string().uri(), // URL
  )
  .required();
const hostPortSchema = Joi.number().integer().min(1).max(65535).required();
const trimmedStringSchema = Joi.string().trim().required();
const stringSchema = Joi.string().pattern(/\S/).required();
const integerSchema = Joi.number().integer().required();

export const envValidationSchema = Joi.object({
  SERVER_BASE_URL: validateHostDomain,
  SERVER_PORT: hostPortSchema,

  DB_HOST: validateHostDomain,
  DB_PORT: hostPortSchema,
  DB_USER: trimmedStringSchema.min(1).max(32),
  DB_PASSWORD: stringSchema.min(1).max(255),
  DB_SCHEMA: trimmedStringSchema.min(1).max(64),

  BCRYPT_PASSWORD_ROUNDS: integerSchema.min(10).max(14),
  BCRYPT_REFRESH_TOKEN_ROUNDS: integerSchema.min(10).max(14),

  JWT_ACCESS_TOKEN_SECRET: stringSchema.min(32).max(100),
  JWT_ACCESS_TOKEN_EXPIRES_IN: integerSchema.min(60).max(3600),

  JWT_REFRESH_TOKEN_SECRET: stringSchema.min(32).max(100),
  JWT_REFRESH_TOKEN_EXPIRES_IN: integerSchema.min(3600).max(2_592_000),
});
