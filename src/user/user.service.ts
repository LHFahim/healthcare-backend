import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly userPublicFields = {
    email: true,
    fullName: true,
    firstName: true,
    lastName: true,
    avatar: true,
    city: true,
    postCode: true,
    address: true,
    phoneNumber: true,
    secondaryPhoneNumber: true,
  } as const;

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.prisma.userEntity.findMany({
      select: this.userPublicFields,
    });
    console.log(this.configService.JWT_SECRET);
    return users;
  }

  async findOneForAuth(username: string) {
    const user = await this.prisma.userEntity.findFirst({
      where: { email: username },
    });
    return user;
  }

  async findUserById(id: string) {
    const user = await this.prisma.userEntity.findUnique({
      where: { id: id },
    });
    return user;
  }

  async findMyProfile(userId: string) {
    const user = await this.prisma.userEntity.findUnique({
      where: { id: userId },
      select: this.userPublicFields,
    });
    return user;
  }
}
