import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ControllersEnum } from 'src/common/constants/controllers.enum';
import { Routes } from 'src/common/constants/routes';
import { UserId } from 'src/common/decorators/controller.decorator';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller(ControllersEnum.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(Routes[ControllersEnum.USERS].findAll)
  findAll() {
    return this.userService.findAll();
  }

  @Get(Routes[ControllersEnum.USERS].profile)
  findMyProfile(@UserId() userId: string) {
    return this.userService.findMyProfile(userId);
  }
}
