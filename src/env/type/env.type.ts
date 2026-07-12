export type ServerEnv = {
  HOST: string;
  PORT: number;
};

export type DatabaseEnv = {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  COMMON_SCHEMA: string;
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
