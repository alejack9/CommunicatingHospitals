import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PreparationsService } from './preparations.service';
import { UserService } from '../user/user.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreatePreparationDto } from 'src/common/dtos/create-preparation.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import { PreparationTypePipe } from 'src/common/pipes/preparation-type.pipe';
import { PreparationType } from 'src/common/preparation.type';
import { DateRangeDto } from 'src/common/dtos/date-range.dto';
import { Preparation } from 'src/common/interfaces/preparation.interface';
import { DatePipe } from 'src/common/pipes/date.pipe';

@Controller('preparations')
export class PreparationsController {
  constructor(
    private readonly preparationsService: PreparationsService,
    private readonly userService: UserService,
  ) {}

  /**
   * Creates a new preparation and associates it with the hospital
   * @param prep The preparation object. It must accord with CreatePreparationDto
   */
  @Post()
  @UseGuards(new AdminGuard())
  async createPreparation(@Body() prep: CreatePreparationDto) {
    const newPrep = await this.preparationsService.create(prep);
    await this.preparationsService.addPreparation(
      newPrep.hospital as Types.ObjectId,
      newPrep._id,
    );
  }

  /**
   * Returns all preparation types of the hospital associated to the user
   * @param user user object inserted by express-jwt in AuthenicationMiddleware (for this reason, it is unchangable by the client)
   * @param type the preparation type
   * @param range the dates range (to decrease the query size)
   */
  @Get('/:type')
  async getPrepration(
    @User() user: UserDto,
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Query('start', new DatePipe()) start: Date,
    @Query('end', new DatePipe()) end: Date,
  ): Promise<Preparation[]> {
    // Uses the userService to get the hosptial of the user, than uses the hospitalId to retrive the preparations
    return await this.preparationsService.getPreparations(
      await this.userService.getHospitalID(user.sub),
      type,
      [start, end],
    );
  }
}
