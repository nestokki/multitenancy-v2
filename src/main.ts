import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/service/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { appEnv } = app.get(EnvService);

  await app.listen(appEnv.SERVER_PORT);
}

bootstrap().catch((error: unknown) => {
  console.error(error);

  process.exit(1);
});
