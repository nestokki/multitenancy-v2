import { registerAs } from '@nestjs/config';
import type { AppEnv, DatabaseEnv, BcryptEnv, JwtEnv } from '../type/env.type';
import {
  getRequiredEnvNumber,
  getRequiredEnvString,
  getRequiredTrimmedEnvString,
} from './env.parser';

export const appConfig = registerAs(Symbol('APP_CONFIG_TOKEN'), (): AppEnv => ({
  SERVER_BASE_URL: getRequiredEnvString('SERVER_BASE_URL'),
  SERVER_PORT: getRequiredEnvNumber('SERVER_PORT'),
}));

export const databaseConfig = registerAs(Symbol('DATABASE_CONFIG_TOKEN'), (): DatabaseEnv => ({
  HOST: getRequiredEnvString('DB_HOST'),
  PORT: getRequiredEnvNumber('DB_PORT'),
  USER: getRequiredTrimmedEnvString('DB_USER'),
  PASSWORD: getRequiredEnvString('DB_PASSWORD'),
  COMMON_SCHEMA: getRequiredTrimmedEnvString('DB_COMMON_SCHEMA'),
}));

export const bcryptConfig = registerAs(Symbol('BCRYPT_CONFIG_TOKEN'), (): BcryptEnv => ({
  PASSWORD_ROUNDS: getRequiredEnvNumber('BCRYPT_PASSWORD_ROUNDS'),
  REFRESH_TOKEN_ROUNDS: getRequiredEnvNumber('BCRYPT_REFRESH_TOKEN_ROUNDS'),
}));

export const jwtConfig = registerAs(Symbol('JWT_CONFIG_TOKEN'), (): JwtEnv => ({
  ACCESS_TOKEN: {
    SECRET: getRequiredEnvString('JWT_ACCESS_TOKEN_SECRET'),
    EXPIRES_IN: getRequiredEnvNumber('JWT_ACCESS_TOKEN_EXPIRES_IN'),
  },
  REFRESH_TOKEN: {
    SECRET: getRequiredEnvString('JWT_REFRESH_TOKEN_SECRET'),
    EXPIRES_IN: getRequiredEnvNumber('JWT_REFRESH_TOKEN_EXPIRES_IN'),
  },
}));

export const envConfigs = [appConfig, databaseConfig, bcryptConfig, jwtConfig];
