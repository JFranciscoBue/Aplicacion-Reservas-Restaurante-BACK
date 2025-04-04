import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
