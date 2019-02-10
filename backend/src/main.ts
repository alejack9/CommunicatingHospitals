import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// Make an environment object that is module-scoped to get environment variables
const environments = dotenv.parse(
  fs.readFileSync(`${process.env.NODE_ENV || 'development'}.env`),
);

async function bootstrap() {
  const PORT = environments.PORT || 3000;
  const detailedResponses = environments.DETAILED_RESPONSES.match('true');
  const DETAILS = environments.DETAILS.match('true');

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
