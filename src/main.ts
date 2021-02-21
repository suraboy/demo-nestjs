import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidateException } from './helpers/validate.exception';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new ValidateException());
  const server_port = process.env.SERVICE_PORT || process.env.PORT || 80;
  const server_host = process.env.SERVICE_HOST || '0.0.0.0';
  await app.listen(server_port, server_host, () => {
    console.log('Listening on port %d', server_port);
  });
}

bootstrap();
