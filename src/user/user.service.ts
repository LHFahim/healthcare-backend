import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {
    // service bootstrap
  }

  async onModuleInit() {
    // const user = await this.prisma.userEntity.findFirst({
    //   where: {
    //     authPanel: AuthPanel.SUPER_ADMIN,
    //   },
    // });
    // if (user) {
    //   this.logger.log(`Super admin already exists: ${user.email}`);
    //   return;
    // }
    // const email = 'admin@admin.com';
    // const password = 'pass1234';
    // if (!email || !password) {
    //   this.logger.warn(
    //     'No super admin found. Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD to create one automatically.',
    //   );
    //   return;
    // }
    // await this.prisma.userEntity.create({
    //   data: {
    //     email,
    //     password,
    //     authPanel: AuthPanel.SUPER_ADMIN,
    //     authProvider: AuthProvider.EMAIL,
    //   },
    // });
    // this.logger.log(`Created initial super admin: ${email}`);
  }
}
