import { Controller, Body, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from './interfaces/hospital.interface';
import { GeoJSONDto } from './dto/geojson-point.dto';
import { LoggerService } from '../utils/tools/logger.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly tools: LoggerService,
  ) {}
  // @Post()
  // async create(@Body() createHospitalDto: CreateHospitalDto) {
  //   this.hospitalsService.create(createHospitalDto);
  // }

  @Get()
  async findAll() {
    return this.hospitalsService.findAll();
  }

  @Get('/location')
  async find(@Body() location: GeoJSONDto): Promise<Hospital[]> {
    this.tools.log('HospitalController', JSON.stringify(location));
    return this.hospitalsService.find(location);
  }
}
