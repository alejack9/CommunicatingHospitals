import { Controller, Get, Param, Body, Type } from '@nestjs/common';
import { PreparationType } from 'dist/common/preparation-type';
import { PreparationTypePipe } from 'src/common/pipes/preparation-type.pipe';
import { RankingService } from './ranking.service';
import { DateRangeDto } from 'src/common/dtos/date-range.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserService } from 'dist/modules/user/user.service';
import { Types } from 'mongoose';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly userService: UserService,
  ) {}

  @Get('/me')
  async test() {
    // TODO
    throw new Error('TODO');
  }

  @Get('/:type')
  async getTypeRank(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @Body() dateRange: DateRangeDto,
  ) {
    return await this.rankingService.rank(type, dateRange.dates);
  }

  @Get('/:type/me')
  async getTypeRankHospital(
    @Param('type', new PreparationTypePipe()) type: PreparationType,
    @User() user: UserDto,
    @Body()
    dateRange: DateRangeDto,
  ) {
    return await this.rankingService.rank(
      type,
      dateRange.dates,
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
