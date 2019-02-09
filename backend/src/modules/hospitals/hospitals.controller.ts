import { Controller, Body, Get, UseGuards, Post, Put } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { User } from '../user/user.decorator';
import { UserDto } from 'src/common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { PreparationType } from 'src/common/preparation-type';
import { CreateHospitalDto } from 'src/common/dtos/create-hospital.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { PushPreparationDto } from 'src/common/dtos/push-preparation.dto';

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

  @Put()
  @UseGuards(new AdminGuard())
  async pushPreparation(@Body() push: PushPreparationDto) {
    return await this.hospitalsService.push(
      push.preparationID,
      push.hospitalID,
    );
  }

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
