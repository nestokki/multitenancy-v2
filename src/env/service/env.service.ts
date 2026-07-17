import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import type { DeepReadonly } from 'src/common/type/native';
import { appConfig, databaseConfig, bcryptConfig, jwtConfig } from '../config/env.config';
import type { AppEnv, DatabaseEnv, BcryptEnv, JwtEnv } from '../type/env.type';

@Injectable()
export class EnvService {
  constructor(
    @Inject(appConfig.KEY) private readonly appConfigs: ConfigType<typeof appConfig>,
    @Inject(databaseConfig.KEY) private readonly databaseConfigs: ConfigType<typeof databaseConfig>,
    @Inject(bcryptConfig.KEY) private readonly bcryptConfigs: ConfigType<typeof bcryptConfig>,
    @Inject(jwtConfig.KEY) private readonly jwtConfigs: ConfigType<typeof jwtConfig>,
  ) {}

  get appEnv(): DeepReadonly<AppEnv> {
    return this.appConfigs;
  }

  get databaseEnv(): DeepReadonly<DatabaseEnv> {
    return this.databaseConfigs;
  }

  get bcryptEnv(): DeepReadonly<BcryptEnv> {
    return this.bcryptConfigs;
  }

  get jwtEnv(): DeepReadonly<JwtEnv> {
    return this.jwtConfigs;
  }
}
