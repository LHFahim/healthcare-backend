import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthPanel, AuthProvider } from 'generated/prisma/enums';

export class UserProfileDto {
  @Expose()
  @ApiProperty({})
  id: string;

  @Expose()
  @ApiProperty({})
  email: string;

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  fullName?: string | null;

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  firstName?: string | null;

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  lastName?: string | null;

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  avatar?: string | null;

  @Expose()
  @ApiProperty({ enum: AuthProvider })
  authProvider: AuthProvider;

  @Expose()
  @ApiProperty({ enum: AuthPanel })
  authPanel: AuthPanel;

  @Expose()
  @ApiProperty({})
  emailVerified: boolean;

  @Expose()
  @ApiProperty({})
  isActive: boolean;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}

export class AuthResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  access_token: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  refresh_token: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => UserProfileDto)
  @ApiProperty({})
  user: UserProfileDto;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'stringst' })
  password: string;
}
