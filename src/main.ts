import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/service/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { serverEnv } = app.get(EnvService);

  const { HOST, PORT } = serverEnv;

  await app.listen(PORT, HOST);
}

bootstrap().catch((error: unknown) => {
  console.error(error);

  process.exit(1);
});
