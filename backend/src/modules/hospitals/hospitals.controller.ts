import { Controller, Body, Get, Headers, UseGuards } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { User } from '../user/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { PreparationType } from 'src/common/preparation-type';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll() {
    return this.hospitalsService.findAll();
  }

  @Get('/location')
  async find(@Body() location: GeoJSONDto): Promise<Hospital[]> {
    return this.hospitalsService.find(location);
  }

  @Get('/preparationTypes')
  async getpreparationTypes(@User() user: UserDto): Promise<PreparationType[]> {
    return await this.hospitalsService.getPreparationTypes(
      await this.userService.getHospitalID(user.sub),
    );
  }
}
