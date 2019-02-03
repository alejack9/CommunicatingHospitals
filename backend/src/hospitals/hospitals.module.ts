import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalSchema } from './schemas/hospital.schema';
import { LoggerService } from 'src/utils/tools/logger.service';

@Module({
  imports: [
    // forFeature: record a new pair <modelName-schema> in the scope
    // name: the name of the model
    // schema: the schema
    MongooseModule.forFeature([{ name: 'Hospital', schema: HospitalSchema }]),
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService, LoggerService],
})
export class HospitalsModule {}
