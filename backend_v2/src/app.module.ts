import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToolsService } from './utils/tools/tools.service';
import { HospitalsModule } from './hospitals/hospitals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationsModule } from './preparations/preparations.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '..', 'run.env') });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_ADD, { useNewUrlParser: true }),
    PreparationsModule,
    HospitalsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ToolsService],
})
export class AppModule {}
