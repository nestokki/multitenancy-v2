import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import type { DeepReadonly } from 'src/common/type/native';
import { serverConfig, databaseConfig, bcryptConfig, jwtConfig } from '../config/env.config';
import type { ServerEnv, DatabaseEnv, BcryptEnv, JwtEnv } from '../type/env.type';

@Injectable()
export class EnvService {
  constructor(
    @Inject(serverConfig.KEY) private readonly serverConfigs: ConfigType<typeof serverConfig>,
    @Inject(databaseConfig.KEY) private readonly databaseConfigs: ConfigType<typeof databaseConfig>,
    @Inject(bcryptConfig.KEY) private readonly bcryptConfigs: ConfigType<typeof bcryptConfig>,
    @Inject(jwtConfig.KEY) private readonly jwtConfigs: ConfigType<typeof jwtConfig>,
  ) {}

  get serverEnv(): DeepReadonly<ServerEnv> {
    return this.serverConfigs;
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
