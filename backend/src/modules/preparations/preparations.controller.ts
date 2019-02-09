import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { PreparationsService } from './preparations.service';
import { Preparation } from '../../common/interfaces/preparation.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import {
  PreparationType,
  PreparationTypesArray,
} from 'src/common/preparation-type';
import { PreparationTypePipe } from 'src/common/pipes/preparation-type.pipe';

@Controller('preparations')
export class PreparationsController {
  constructor(
    private readonly preparationsService: PreparationsService,
    private readonly userService: UserService,
  ) {}

  /**
   * @param user user object inserted by express-jwt in AuthenicationMiddleware (for this reason, it is unchangable by the client)
   */
  @Get('/:type')
  async getPrepration(
    @User() user: UserDto,
    @Param('type', new PreparationTypePipe()) type: PreparationType,
  ): Promise<Preparation[]> {
    // Uses the userService to get the hosptial of the user, than use the hospitalId to retrive the preparations
    return await this.preparationsService.getPreparations(
      await this.userService.getHospitalID(user.sub),
      type,
    );
  }
}
