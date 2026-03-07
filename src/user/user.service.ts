import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.prisma.userEntity.findMany({});
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

  async findMyProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.prisma.userEntity.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      ...user,
      fullName: user.fullName ?? undefined,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      avatar: user.avatar ?? undefined,
      city: user.city ?? undefined,
      postCode: user.postCode ?? undefined,
      address: user.address ?? undefined,
      phoneNumber: user.phoneNumber ?? undefined,
      secondaryPhoneNumber: user.secondaryPhoneNumber ?? undefined,
    };
  }
}
