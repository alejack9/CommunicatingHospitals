import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalsController } from './hospitals/hospitals.controller';

@Module({
  imports: [],
  controllers: [AppController, HospitalsController],
  providers: [AppService],
})
export class AppModule {}
