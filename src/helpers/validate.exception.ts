import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidateException implements ExceptionFilter<BadRequestException> {
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    if (
      typeof exception.response.message == 'object' &&
      exception.response.message.length > 0
    ) {
      response.status(422).json({
        errors: {
          status_code: 422,
          message: `The given data was invalid.`,
          errors: this.handleValidationError(exception.response.message),
        },
      });
    } else {
      response.status(HttpStatus.BAD_REQUEST).json({
        errors: {
          status_code: HttpStatus.BAD_REQUEST,
          message: exception.response.error,
        },
      });
    }
  }

  private handleValidationError(errors) {
    const result = {};
    errors.forEach(function (value) {
      const mainFieldKey = value.property;
      if (value.children.length == 0) {
        const message = Object.keys(value.constraints).map(
          (key) => value.constraints[key],
        );
        result[mainFieldKey] = message;
      } else {
        value.children.forEach(function (nestedObjectKey) {
          const majorFieldKey = nestedObjectKey.property;
          nestedObjectKey.children.forEach(function (nestedObjectKey) {
            const arrValues = Object.keys(nestedObjectKey.constraints).map(
              (key) => nestedObjectKey.constraints[key],
            );
            const errorField =
              mainFieldKey +
              '.' +
              majorFieldKey +
              '.' +
              nestedObjectKey.property;
            result[errorField] = arrValues;
          });
        });
      }
    });

    return result;
  }
}
