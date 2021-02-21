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
  const post = process.env.SERVICE_PORT || 5000;
  await app.listen(post, () => console.log('Post is ' + post));
}

bootstrap();
