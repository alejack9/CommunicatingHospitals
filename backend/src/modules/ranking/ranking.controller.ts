import { Controller, Get, Param, Body, UseGuards, Put } from '@nestjs/common';
import { PreparationType } from '../../common/preparation.type';
import { PreparationTypePipe } from 'src/common/pipes/preparation-type.pipe';
import { RankingService } from './ranking.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { DateUnitPipe } from 'src/common/pipes/date-unit.pipe';
import { DateUnit } from 'src/common/date-unit.type';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly userService: UserService,
  ) {}

  @Put()
  @UseGuards(new AdminGuard())
  async setRanks() {
    return await this.rankingService.setRanks();
  }

  @Get('/:type')
  async getTypeRank(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
  ) {
    return await this.rankingService.rank(type, dateUnit);
  }

  @Get('/:type/me')
  async getTypeRankHospital(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Body('dateUnit', new DateUnitPipe()) dateUnit: DateUnit,
    @User() user: UserDto,
  ) {
    return await this.rankingService.rank(
      type,
      dateUnit,
      await this.userService.getHospitalID(user.sub),
    );
  }

  // @Get('/:type/:hospitalId')
  // async getTypeRankHospital(
  //   @Param('type', new PreparationTypePipe()) type: PreparationType,
  //   @Param('hospitalId', new HospitalIdPipe()) hospitalId: Types.ObjectId,
  //   @Body() dateRange: DateRangeDto,
  // ) {
  //   return await this.rankingService.rank(type, dateRange.dates, hospitalId);
  // }
}
