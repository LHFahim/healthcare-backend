import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ControllersEnum } from 'src/common/constants/controllers.enum';
import { Routes } from 'src/common/constants/routes';
import { Public } from 'src/common/decorators/controller.decorator';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto } from './dto/auth.dto';
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

  @Public()
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: AuthResponseDto })
  @Post(Routes[ControllersEnum.AUTH].login)
  async login(@Body() body: LoginDto) {
    return await this.authService.signIn(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post(Routes[ControllersEnum.AUTH].logout)
  logout(@Request() req) {
    return req.logout();
  }
}
