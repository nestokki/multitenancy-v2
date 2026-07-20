import { join } from 'node:path';
import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import type { PoolOptions } from 'mysql2';
import type { LogLevel } from 'typeorm';
import { NodeEnv } from 'src/env/enum/node-env.enum';
import { EnvService } from 'src/env/service/env.service';

const sourceRoot = join(__dirname, '../../../..');

const loggingByNodeEnv: Record<NodeEnv, LogLevel[]> = {
  [NodeEnv.LOCAL]: ['error'],
  [NodeEnv.DEV]: ['query', 'schema', 'error', 'warn', 'migration'],
  [NodeEnv.PROD]: ['error', 'warn', 'migration'],
};

@Injectable()
export class TypeOrmModuleOptionsConfig implements TypeOrmOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { appEnv, databaseEnv } = this.envService;

    const mysqlPoolOptions = {
      waitForConnections: true,
      maxIdle: databaseEnv.POOL_MAX_IDLE,
      idleTimeout: databaseEnv.POOL_IDLE_TIMEOUT_MS,
      queueLimit: databaseEnv.POOL_QUEUE_LIMIT,
    } satisfies PoolOptions;

    return {
      type: 'mysql',
      host: databaseEnv.HOST,
      port: databaseEnv.PORT,
      username: databaseEnv.USER,
      password: databaseEnv.PASSWORD,
      database: databaseEnv.SCHEMA,
      charset: 'utf8mb4',
      timezone: databaseEnv.TIMEZONE,
      poolSize: databaseEnv.POOL_SIZE,
      extra: mysqlPoolOptions,
      connectTimeout: databaseEnv.CONNECT_TIMEOUT_MS,
      retryAttempts: databaseEnv.RETRY_ATTEMPTS,
      retryDelay: databaseEnv.RETRY_DELAY_MS,
      entities: [join(sourceRoot, 'api/**/*.entity.{ts,js}')],
      synchronize: false,
      logging: loggingByNodeEnv[appEnv.NODE_ENV],
      maxQueryExecutionTime: databaseEnv.SLOW_QUERY_THRESHOLD_MS,
      invalidWhereValuesBehavior: {
        null: 'throw',
        undefined: 'throw',
      },
    };
  }
}
