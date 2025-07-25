import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { seed } from 'test/seed';
import { DataSource } from 'typeorm';
import { environments } from './common/constants/environments';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === environments.DEVELOPMENT) {
    const dataSource = app.get(DataSource);
    await seed(app, dataSource);
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_WHITELIST?.split(','),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
