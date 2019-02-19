import {
  Controller,
  Get,
  Param,
  Body,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { PreparationType } from 'src/common/preparation.type';
import { DateUnit } from 'src/common/date-unit.type';
import { DateUnitPipe } from 'src/common/pipes/date-unit.pipe';
import { PreparationTypePipe } from 'src/common/pipes/preparation-type.pipe';
import { UserDto } from 'src/common/dtos/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { HospitalIdPipe } from 'src/common/pipes/hospital-id.pipe';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly userService: UserService,
  ) {}

  /**
   * Sets the averageRanks of all hospitals. The average rank is a simple average of the ranking in a period
   */
  @Put()
  @UseGuards(new AdminGuard())
  async setAverageRanks() {
    return await this.rankingService.setAverageRanks();
  }

  /**
   * Returns the ranking in a specific preparation type and date unit.
   * @param type The preparation type
   * @param dateUnit The period
   */
  @Get('/:type')
  async getTypeRank(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Query('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
  ) {
    return await this.rankingService.getTypeRank(type, dateUnit);
  }

  /**
   * Returns the rank of the hospital associated to the user in a specific preparation type and date unit.
   * @param type The preparation type
   * @param dateUnit The period
   * @param user The user gotten by the token
   */
  @Get('/:type/me')
  async getTypeRankHospital(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Query('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
    @User() user: UserDto,
  ) {
    return await this.rankingService.getTypeRank(
      type,
      dateUnit,
      await this.userService.getHospitalID(user.sub),
    );
  }

  /**
   * Returns the average rank of an hospital in a period ('day' returns null)
   * @param hospitalId The hospital ID
   * @param dateUnit The period
   */
  @Get('position/:hospitalId')
  async getRank(
    @Param('hospitalId', new HospitalIdPipe()) hospitalId: Types.ObjectId,
    @Query('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
  ) {
    return await this.rankingService.getAverageRank(dateUnit, hospitalId);
  }

  // @Get('/:type/:hospitalId')
  // async getTypeRankHospital(
  //   @Param('type', new PreparationTypePipe()) type: PreparationType,
  //   @Param('hospitalId', new HospitalIdPipe()) hospitalId: Types.ObjectId,
  //   @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
  // ) {
  //   return await this.rankingService.getRank(type, dateUnit, hospitalId);
  // }
}
