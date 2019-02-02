import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalSchema } from './schemas/hospital.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hospital', schema: HospitalSchema }]),
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService],
})
export class HospitalsModule {}
