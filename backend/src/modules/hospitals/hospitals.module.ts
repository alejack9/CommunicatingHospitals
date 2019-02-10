import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalSchema } from '../../common/schemas/hospital.schema';
import { LoggerService } from '../../utils/tools/logger.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // forFeature: record a new pair <modelName-schema> in the scope
    // name: the name of the model
    // schema: the schema
    MongooseModule.forFeature([{ name: 'Hospital', schema: HospitalSchema }]),
    UserModule,
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService, LoggerService],
})
export class HospitalsModule {}
