import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** add global validation pipe, then each body will validated using their  dtos */
  app.useGlobalPipes(
    new ValidationPipe({
      /** remove unneccesary properties */
      whitelist: true,
      /** throw error when there is additional properties  */
      forbidNonWhitelisted: true,
      /**  converted object shape correct shape of the dto instance  */
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
