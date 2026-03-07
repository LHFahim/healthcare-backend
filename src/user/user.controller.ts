import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiDtoResponse } from 'libs/decorators/api-response.decorator';
import { ControllersEnum } from 'src/common/constants/controllers.enum';
import { Routes } from 'src/common/constants/routes';
import { UserId } from 'src/common/decorators/controller.decorator';
import { UserProfileDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller(ControllersEnum.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(Routes[ControllersEnum.USERS].findAll)
  findAll() {
    return this.userService.findAll();
  }

  @ApiDtoResponse(UserProfileDto)
  @Get(Routes[ControllersEnum.USERS].profile)
  findMyProfile(@UserId() userId: string): Promise<UserProfileDto> {
    return this.userService.findMyProfile(userId);
  }
}
