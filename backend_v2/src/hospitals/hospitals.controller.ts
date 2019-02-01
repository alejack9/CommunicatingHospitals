import { Controller, Post, Body, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from './interfaces/hospital.interface';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Post()
  async create(@Body() createHospitalDto: CreateHospitalDto) {
    this.hospitalsService.create(createHospitalDto);
  }

  @Get()
  async findAll(): Promise<Hospital[]> {
    return this.hospitalsService.findAll();
  }
}
