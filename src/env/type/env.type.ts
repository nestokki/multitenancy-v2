import type { NodeEnv } from '../enum/node-env.enum';

export type AppEnv = {
  NODE_ENV: NodeEnv;
  SERVER_BASE_URL: string;
  SERVER_PORT: number;
};

export type DatabaseEnv = {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  SCHEMA: string;
  TIMEZONE: string;
  POOL_SIZE: number;
  POOL_MAX_IDLE: number;
  POOL_IDLE_TIMEOUT_MS: number;
  POOL_QUEUE_LIMIT: number;
  CONNECT_TIMEOUT_MS: number;
  RETRY_ATTEMPTS: number;
  RETRY_DELAY_MS: number;
  SLOW_QUERY_THRESHOLD_MS: number;
};

export type BcryptEnv = {
  PASSWORD_ROUNDS: number;
  REFRESH_TOKEN_ROUNDS: number;
};

export type JwtEnv = {
  ACCESS_TOKEN: {
    SECRET: string;
    EXPIRES_IN: number;
  };
  REFRESH_TOKEN: {
    SECRET: string;
    EXPIRES_IN: number;
  };
};
