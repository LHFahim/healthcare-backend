import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthPanel, AuthProvider } from 'generated/prisma/enums';
import { ConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
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

  async validateUser(dto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneForAuth(dto.email);
    if (user && user.password === dto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(dto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneForAuth(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const { password, ...result } = user;
    if (password !== dto.password)
      throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user.id, username: user.email };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }

  public async getHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
