import { Controller, Get } from '@nestjs/common';

@Controller('hospitals')
export class HospitalsController {
  @Get()
  async findAll(): Promise<string[]> {
    return ['Pizza', 'Coke'];
  }
}
