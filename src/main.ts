import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2'); // Set global prefix for all routes
   app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Elimina propiedades no permitidas
        forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      }),
    )
  await app.listen(process.env.PORT ?? 3000);

   
}
bootstrap();
