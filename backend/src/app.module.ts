import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HospitalsModule } from './hospitals/hospitals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PreparationsModule } from './preparations/preparations.module';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const db = dotenv.parse(
  fs.readFileSync(`${process.env.NODE_ENV || 'development'}.env`),
).DATABASE;

@Module({
  imports: [
    ConfigModule,
    // connect to db
    // MongooseModule is a mongoose module made by nest
    MongooseModule.forRoot(db, { useNewUrlParser: true }),
    PreparationsModule,
    HospitalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
