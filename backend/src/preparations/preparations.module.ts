import { Module } from '@nestjs/common';
import { PreparationsService } from './preparations.service';
import { PreparationsController } from './preparations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationSchema } from './schemas/preparation.schema';

@Module({
  imports: [
    // which schema has to be used in this scope
    MongooseModule.forFeature([
      { name: 'Preparation', schema: PreparationSchema },
    ]),
  ],
  controllers: [PreparationsController],
  providers: [PreparationsService],
})
export class PreparationsModule {}
