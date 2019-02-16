import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { PreparationsService } from './preparations.service';
import { Preparation } from '../../common/interfaces/preparation.interface';
import { UserService } from '../user/user.service';
import { User } from '../../common/decorators/user.decorator';
import { UserDto } from '../../common/dtos/user.dto';
import { PreparationType } from '../../common/preparation.type';
import { PreparationTypePipe } from '../../common/pipes/preparation-type.pipe';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreatePreparationDto } from '../../common/dtos/create-preparation.dto';
import { ObjectID } from 'bson';
import { DateRangeDto } from 'src/common/dtos/date-range.dto';

@Controller('preparations')
export class PreparationsController {
  constructor(
    private readonly preparationsService: PreparationsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(new AdminGuard())
  async createPreparation(@Body() prep: CreatePreparationDto) {
    const newPrep = await this.preparationsService.create(prep);
    await this.preparationsService.push(
      newPrep.hospital as ObjectID,
      newPrep._id,
    );
  }
  /**
   * @param user user object inserted by express-jwt in AuthenicationMiddleware (for this reason, it is unchangable by the client)
   */
  @Get('/:type')
  async getPrepration(
    @User() user: UserDto,
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    // @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
    @Body() range: DateRangeDto,
  ): Promise<Preparation[]> {
    // Uses the userService to get the hosptial of the user, than uses the hospitalId to retrive the preparations
    return await this.preparationsService.getPreparations(
      await this.userService.getHospitalID(user.sub),
      type,
      range.dates,
    );
  }
}
