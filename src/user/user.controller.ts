import { Get } from '@nestjs/common';
import { ApiControllerWithoutAuth } from 'src/common/decorators/controller.decorator';
import { ControllersEnum } from 'src/common/enums/controllers.enum';
import { UsersService } from './user.service';

@ApiControllerWithoutAuth(ControllersEnum.USER, 'User')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
