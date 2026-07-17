import 'reflect-metadata';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { DataSource } from 'typeorm';
import {
  getRequiredEnvString,
  getRequiredEnvNumber,
  getRequiredTrimmedEnvString,
} from '../../../../env/config/env.parser';
import { resolveEnvFilePath } from '../../../../env/validation/env-file-path.validation';

const nodeEnv = process.env.NODE_ENV;

const envFilePath = resolve(process.cwd(), resolveEnvFilePath(nodeEnv));

if (existsSync(envFilePath)) loadEnvFile(envFilePath);

const sourceRoot = join(__dirname, '../../../..');

const typeormDataSource = new DataSource({
  type: 'mysql',
  host: getRequiredEnvString('DB_HOST'),
  port: getRequiredEnvNumber('DB_PORT'),
  username: getRequiredTrimmedEnvString('DB_USER'),
  password: getRequiredEnvString('DB_PASSWORD'),
  database: getRequiredTrimmedEnvString('DB_SCHEMA'),

  entities: [join(sourceRoot, '**/*.entity.{ts,js}')],

  synchronize: false,
  migrations: [join(sourceRoot, '**/migration/**/*.{ts,js}')],
  migrationsTableName: 'migrations',
});

export default typeormDataSource;
