import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  // tslint:disable-next-line: no-console
  console.log(`Listening on port ${PORT}`);
}

bootstrap();

// mongoose
// .connect(process.env.MONGO_ADD, { useNewUrlParser: true })
// .then(() => {
//   console.log('Connected to MongoDB...');
//   create();
// })
// .catch(err => console.error('Error connecting to MongoDB: ', err.message));

// async function create() {
//   const hosp1 = new Hospital({
//     name: 'Falconara',
//     coordinates: {
//       type: 'feautre',
//       geometry: {
//         type: 'Point',
//         coordinates: [125.6, 10.1],
//       },
//       properties: {},
//     },
//   });
//   await hosp1.save();
//   console.log('Saved!!!!');
// }
