import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  fullName?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  firstName?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  lastName?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  avatar?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  city?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  postCode?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  address?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  phoneNumber?: string | null;

  @ApiProperty({ required: false, nullable: true, type: String })
  secondaryPhoneNumber?: string | null;

  @ApiProperty()
  authProvider: string;

  @ApiProperty()
  authPanel: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  passwordChangeRequired: boolean;
}
