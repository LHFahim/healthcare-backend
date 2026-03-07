import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

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
}
