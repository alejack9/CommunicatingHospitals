import { Controller, Body, Get, UseGuards, Post } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { User } from '../../common/decorators/user.decorator';
import { UserDto } from '../../common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { PreparationType } from '../../common/preparation.type';
import { CreateHospitalDto } from '../../common/dtos/create-hospital.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

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
   * @param location The center of the circle area and the range. It must accord with GeoJSONDto object validator.
   */
  @Get('/location')
  async find(@Body() location: GeoJSONDto): Promise<Hospital[]> {
    return this.hospitalsService.find(location, location.distance);
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
