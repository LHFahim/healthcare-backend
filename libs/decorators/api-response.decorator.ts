import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiDtoResponse<TModel extends Type<any>>(dto: TModel) {
  return applyDecorators(
    ApiOkResponse({ type: dto }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function ApiDtoArrayResponse<TModel extends Type<any>>(dto: TModel) {
  return applyDecorators(
    ApiOkResponse({ type: dto, isArray: true }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
