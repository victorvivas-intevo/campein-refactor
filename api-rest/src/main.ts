import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    // origin: ['https://campein-frontend-408168404729.us-central1.run.app'], // o un array de orígenes si necesitas más
    origin: [
      'https://prod-front-campein-408168404729.us-east1.run.app',
      'https://campein.com',
      'www.campein.com',
    ], // o un array de orígenes si necesitas más
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    // allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
