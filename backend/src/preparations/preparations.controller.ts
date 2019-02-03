import { Controller, Get } from '@nestjs/common';
import { PreparationsService } from './preparations.service';
import { Preparation } from './interfaces/preparation.interface';

@Controller('preparations')
export class PreparationsController {
  constructor(private readonly preparationsService: PreparationsService) {}

  // @Post()
  // async create(@Body() createHospitalDto: CreatePreparationDto) {
  //   this.preparationsService.create(createHospitalDto);
  // }

  @Get()
  async findAll(): Promise<Preparation[]> {
    return this.preparationsService.findAll();
  }
}
