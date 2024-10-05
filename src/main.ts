import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/** place where start the nest app */
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

  /** swagger  config */
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Story Pulse - Blog API')
    .setDescription('use the base API URL as http://localhost:3000')
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /** enable cors */
  app.enableCors();

  /**global interceptors */
  // app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
