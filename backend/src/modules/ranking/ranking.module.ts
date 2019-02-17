import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PreparationSchema } from 'src/common/schemas/preparation.schema';
import { HospitalSchema } from 'src/common/schemas/hospital.schema';
import { RankSchema } from 'src/common/schemas/rank.schema';
import { UserModule } from '../user/user.module';
import { HospitalsService } from '../hospitals/hospitals.service';

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
