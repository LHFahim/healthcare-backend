import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsString,
  Min,
  validateSync,
} from 'class-validator';

@Injectable()
export class ConfigService {
  @IsDefined()
  @IsInt()
  @Min(1)
  PORT: number;

  // @IsOptional()
  // @IsString()
  // MONGODB_URL: string;

  @IsDefined()
  @IsString()
  JWT_SECRET: string;

  @IsDefined()
  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsDefined()
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsDefined()
  @IsEmail()
  SUPER_ADMIN_EMAIL: string;

  @IsDefined()
  @IsString()
  SUPER_ADMIN_PASSWORD: string;

  // @IsDefined()
  // @IsEmail()
  // USER_ONE_EMAIL: string;

  // @IsDefined()
  // @IsString()
  // USER_ONE_PASSWORD: string;

  // @IsDefined()
  // @IsEmail()
  // USER_TWO_EMAIL: string;

  // @IsDefined()
  // @IsString()
  // USER_TWO_PASSWORD: string;
}

export function validateEnv(raw: NodeJS.ProcessEnv): ConfigService {
  // convert raw env (strings) into class instance
  const config = plainToInstance(ConfigService, raw, {
    enableImplicitConversion: true, // PORT becomes number automatically
  });

  const errors = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const msgs = errors
      .map(
        (e) =>
          `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`,
      )
      .join(' | ');

    throw new Error(`env validation failed: ${msgs}`);
  }

  return config;
}
