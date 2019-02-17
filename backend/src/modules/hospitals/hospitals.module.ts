import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { PreparationSchema } from 'src/common/schemas/preparation.schema';
import { HospitalSchema } from 'src/common/schemas/hospital.schema';

@Module({
  imports: [
    // forFeature: record a new pair <modelName-schema> in the scope
    // name: the name of the model
    // schema: the schema
    MongooseModule.forFeature([{ name: 'Hospital', schema: HospitalSchema }]),
    MongooseModule.forFeature([
      { name: 'Preparation', schema: PreparationSchema },
    ]),
    UserModule,
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService],
})
export class HospitalsModule {}
