import {
  applyDecorators,
  Controller,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import { RoleGuard } from '../../auth/guards/role.guard';
import { APIVersions } from '../constants/api-version.enum';
import { ControllersEnum } from '../constants/controllers.enum';

export const ApiController = (
  path: ControllersEnum,
  apiTag = '',
  version: APIVersions = APIVersions.V1,
) =>
  applyDecorators(
    ApiBearerAuth(),
    // UseGuards(JwtAuthGuard),
    // UseGuards(RoleGuard),
    ApiTags(apiTag),
    Controller({ path, version }),
  );

export const ApiControllerWithoutAuth = (
  path: ControllersEnum,
  apiTag = '',
  version: APIVersions = APIVersions.V1,
) => applyDecorators(ApiTags(apiTag), Controller({ path, version }));

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user?.id ?? request.user?.userId;
});
