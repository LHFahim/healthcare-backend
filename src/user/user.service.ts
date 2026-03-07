import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthPanel, AuthProvider } from 'generated/prisma/enums';
import { ConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const user = await this.prisma.userEntity.findFirst({
      where: {
        authPanel: AuthPanel.SUPER_ADMIN,
      },
    });
    if (user) {
      this.logger.log(`Super admin already exists: ${user.email}`);
      return;
    }

    const email = this.configService.SUPER_ADMIN_EMAIL;
    const password = this.configService.SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
      this.logger.warn(
        'No super admin found. Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD to create one automatically.',
      );
      return;
    }

    await this.prisma.userEntity.create({
      data: {
        email,
        password,
        authPanel: AuthPanel.SUPER_ADMIN,
        authProvider: AuthProvider.EMAIL,
      },
    });

    console.log(`Super admin created with email: ${email}`);
  }

  async findAll() {
    const users = await this.prisma.userEntity.findMany();
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
    });
    return user;
  }
}
