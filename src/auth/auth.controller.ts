import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ControllersEnum } from 'src/common/constants/controllers.enum';
import { Routes } from 'src/common/constants/routes';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @ApiResponse({
  //   type: AuthResponseDto,
  // })
  // @Post(Routes[ControllersEnum.AUTH].login)
  // async login(@Body() body: LoginDto) {
  //   return await this.authService.signIn(body);
  // }

  @UseGuards(LocalAuthGuard)
  @Post(Routes[ControllersEnum.AUTH].login)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(Routes[ControllersEnum.AUTH].profile)
  getProfile(@Request() req) {
    console.log('here', req);
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post(Routes[ControllersEnum.AUTH].logout)
  logout(@Request() req) {
    return req.logout();
  }
}
