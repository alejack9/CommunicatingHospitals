import { Controller, Body, Get, UseGuards, Post, Put } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { User } from '../user/user.decorator';
import { UserDto } from '../../common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { PreparationType } from '../../common/preparation-type';
import { CreateHospitalDto } from '../../common/dtos/create-hospital.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { PushPreparationDto } from '../../common/dtos/push-preparation.dto';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(new AdminGuard())
  async createHospital(@Body() hosp: CreateHospitalDto) {
    return await this.hospitalsService.create(hosp);
  }

  @Get()
  @UseGuards(new AdminGuard())
  async findAll() {
    return this.hospitalsService.findAll();
  }

  @Get('/location')
  async find(@Body() location: GeoJSONDto): Promise<Hospital[]> {
    return this.hospitalsService.find(location, location.distance);
  }

  @Get('/preparationTypes')
  async getpreparationTypes(@User() user: UserDto): Promise<PreparationType[]> {
    return await this.hospitalsService.getPreparationsTypes(
      await this.userService.getHospitalID(user.sub),
    );
  }

  @Get('/myHospital')
  async getHospital(@User() user: UserDto): Promise<Hospital> {
    return (await this.userService.getUserHospital(user.sub))
      .hospital as Hospital;
  }
}
