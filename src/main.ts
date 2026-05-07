import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Глобальная валидация всех DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Warehouse Rental API')
    .setDescription('API для аренды складов')
    .setVersion('1.0')
    .addBearerAuth()  // поддержка JWT в Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Server: http://localhost:3000');
  console.log('Swagger: http://localhost:3000/api/docs');
}
bootstrap();