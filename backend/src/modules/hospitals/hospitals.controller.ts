import { Controller, Body, Get, UseGuards, Post, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { UserService } from 'src/modules/user/user.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateHospitalDto } from 'src/common/dtos/create-hospital.dto';
import { Hospital } from 'src/common/interfaces/hospital.interface';
import { UserDto } from 'src/common/dtos/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { PreparationType } from 'src/common/preparation.type';
import { LongitudinePipe } from 'src/common/pipes/longitudine.pipe';
import { LatitudinePipe } from 'src/common/pipes/latitudine.pipe';
import { DistancePipe } from 'src/common/pipes/distance.pipe';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly userService: UserService,
  ) {}

  /**
   * Creates a new hospital
   * @param hosp The hospital object. It must accord with CreateHospitalDto
   */
  @Post()
  @UseGuards(new AdminGuard())
  async createHospital(@Body() hosp: CreateHospitalDto) {
    return await this.hospitalsService.create(hosp);
  }

  /**
   * Returns all hospitals
   */
  @Get()
  @UseGuards(new AdminGuard())
  async findAll() {
    return this.hospitalsService.findAll();
  }

  /**
   * Returns all hospitals in the passed range
   * @param longitude the longitude of the starting point
   * @param latitude the latitude of the starting point
   * @param distance the radius of the circle
   */
  @Get('/location')
  async find(
    @Query('longitude', new LongitudinePipe()) longitude: number,
    @Query('latitude', new LatitudinePipe()) latitude: number,
    @Query('distance', new DistancePipe()) distance: number,
  ): Promise<Hospital[]> {
    return this.hospitalsService.find(latitude, longitude, distance);
  }

  /**
   * The list of the user's hospital preparation types
   * @param user The user gotten by the token
   */
  @Get('/preparationsTypes')
  async getpreparationTypes(@User() user: UserDto): Promise<PreparationType[]> {
    return await this.hospitalsService.getPreparationsTypes(
      await this.userService.getHospitalID(user.sub),
    );
  }

  /**
   * The hospital associated to the user
   * @param user The user gotten by the token
   */
  @Get('/myHospital')
  async getHospital(@User() user: UserDto): Promise<Hospital> {
    return (await this.userService.getUserHospital(user.sub))
      .hospital as Hospital;
  }
}
