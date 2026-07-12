import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfigs } from './config/env.config';
import { EnvService } from './service/env.service';
import { resolveEnvFilePath } from './validation/env-file-path.validation';
import { envValidationSchema } from './validation/env-schema.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolveEnvFilePath(process.env.NODE_ENV),
      load: envConfigs,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true, // 스키마에 없는 env 허용
        abortEarly: false, // env 검증 에러 한 번에 보여줌
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
