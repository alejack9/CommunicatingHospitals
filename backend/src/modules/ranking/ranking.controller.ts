import { Controller, Get, Param, Body, UseGuards, Put } from '@nestjs/common';
import { PreparationType } from '../../common/preparation.type';
import { PreparationTypePipe } from '../../common/pipes/preparation-type.pipe';
import { RankingService } from './ranking.service';
import { User } from '../../common/decorators/user.decorator';
import { UserDto } from '../../common/dtos/user.dto';
import { UserService } from '../../modules/user/user.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { DateUnitPipe } from '../../common/pipes/date-unit.pipe';
import { DateUnit } from '../../common/date-unit.type';
import { HospitalIdPipe } from 'src/common/pipes/hospital-id.pipe';
import { Types } from 'mongoose';

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
    @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
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
    @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
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
    @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
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
