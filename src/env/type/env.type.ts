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
