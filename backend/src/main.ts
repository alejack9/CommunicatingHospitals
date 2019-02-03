// // !DOTENV MUST BE THE FIRST TO LOAD ENVIRONMENT VARIABLES
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environments = dotenv.parse(
  fs.readFileSync(`${process.env.NODE_ENV || 'development'}.env`),
);
const PORT = environments.PORT || 3000;
const detailedResponses = environments.DETAILED_RESPONSES.match('true');
const DETAILS = environments.DETAILS.match('true');
async function bootstrap() {
  // get the port from environment variable
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: !detailedResponses,
    }),
  );
  await app.listen(PORT);
  if (DETAILS) {
    // tslint:disable-next-line: no-console
    console.log(`\x1b[35mapp:Bootstrap\x1b[0m Listening on port ${PORT}`);
  }
}

bootstrap();

// mongoose
//   .connect(process.env.MONGO_ADD, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB...');
//     create();
//   })
//   .catch(err => console.error('Error connecting to MongoDB: ', err.message));

// async function create() {
//   const hosp1 = mongoose.model('Hospital', HospitalSchema);
//   const hisp1 = new hosp1({
//     name: 'Strange',
//     coordinates: {
//       type: 'MultiPoint',
//       // longitude,latitudine
//       coordinates: [[13.5319518, 43.616754], [0.5319518, 5.616754]],
//     },
//   });
//   await hisp1.save();
//   console.log('Saved!!!!');
// }
