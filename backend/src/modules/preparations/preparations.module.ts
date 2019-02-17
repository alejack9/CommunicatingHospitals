import { Module } from '@nestjs/common';
import { PreparationsService } from './preparations.service';
import { PreparationsController } from './preparations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { PreparationSchema } from 'src/common/schemas/preparation.schema';
import { HospitalSchema } from 'src/common/schemas/hospital.schema';

@Module({
  imports: [
    // which schema has to be used in this scope
    MongooseModule.forFeature([
      { name: 'Preparation', schema: PreparationSchema },
      { name: 'Hospital', schema: HospitalSchema },
    ]),
    UserModule,
  ],
  controllers: [PreparationsController],
  providers: [PreparationsService],
})
export class PreparationsModule {}
