import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationSchema } from 'src/common/schemas/preparation.schema';
import { HospitalSchema } from 'dist/common/schemas/hospital.schema';
import { RankingService } from './ranking.service';
import { UserModule } from 'dist/modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Preparation', schema: PreparationSchema },
      { name: 'Hospital', schema: HospitalSchema },
    ]),
    UserModule,
  ],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
