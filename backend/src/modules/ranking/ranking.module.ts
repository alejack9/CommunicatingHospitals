import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationSchema } from '../../common/schemas/preparation.schema';
import { HospitalSchema } from '../../common/schemas/hospital.schema';
import { RankingService } from './ranking.service';
import { UserModule } from '../../modules/user/user.module';
import { HospitalsService } from '../hospitals/hospitals.service';
import { RankSchema } from '../../common/schemas/rank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Preparation', schema: PreparationSchema },
      { name: 'Hospital', schema: HospitalSchema },
      { name: 'Rank', schema: RankSchema },
    ]),
    UserModule,
  ],
  controllers: [RankingController],
  providers: [RankingService, HospitalsService],
})
export class RankingModule {}
