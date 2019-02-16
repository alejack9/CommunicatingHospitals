import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { PreparationsModule } from './modules/preparations/preparations.module';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { UserModule } from './modules/user/user.module';
import { RankingModule } from './modules/ranking/ranking.module';
// same reason of the main
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const db = dotenv.parse(
  fs.readFileSync(`${process.env.NODE_ENV || 'development'}.env`),
).DATABASE;

@Module({
  imports: [
    // contains the environment variables
    ConfigModule,
    // connect to db
    // MongooseModule is a mongoose module made by nest
    MongooseModule.forRoot(db, { useNewUrlParser: true }),
    // importing this we set the guards provided by the module as global
    AuthModule,
    PreparationsModule,
    HospitalsModule,
    UserModule,
    RankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply authentication middleware for all routes
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
