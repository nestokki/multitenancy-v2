jest.mock('../../src/env/validation/env-file-path.validation', () => ({
  resolveEnvFilePath: () => [],
}));

const originalEnv = { ...process.env };

const testEnv = {
  SERVER_BASE_URL: 'localhost',
  SERVER_PORT: '3000',
  DB_HOST: 'localhost',
  DB_PORT: '3306',
  DB_USER: 'test',
  DB_PASSWORD: 'test',
  DB_SCHEMA: 'test',
  BCRYPT_PASSWORD_ROUNDS: '10',
  BCRYPT_REFRESH_TOKEN_ROUNDS: '10',
  JWT_ACCESS_TOKEN_SECRET: 'a'.repeat(32),
  JWT_ACCESS_TOKEN_EXPIRES_IN: '60',
  JWT_REFRESH_TOKEN_SECRET: 'r'.repeat(32),
  JWT_REFRESH_TOKEN_EXPIRES_IN: '3600',
} satisfies NodeJS.ProcessEnv;

Object.assign(process.env, testEnv);

afterAll(() => {
  process.env = originalEnv;
});
