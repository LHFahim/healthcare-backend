import { Get } from '@nestjs/common';
import { ControllersEnum } from 'src/common/constants/controllers.enum';
import { ApiControllerWithoutAuth } from 'src/common/decorators/controller.decorator';
import { UserService } from './user.service';

@ApiControllerWithoutAuth(ControllersEnum.USER, 'User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
