import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * The hospital associated to the user
   * @param user The user gotten by the token
   */
  @Get('/linkedinToken')
  async getHospital(@User() user: UserDto): Promise<string> {
    return await this.userService.getLinkedinToken(user.sub);
  }
}
