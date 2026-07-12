import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { InfraModule } from './infra/infra.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [EnvModule, InfraModule, ApiModule],
})
export class AppModule {}
