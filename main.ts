import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cho phep Frontend (React/Vue/Angular chay port khac) goi API
  app.enableCors();

  // Tu dong validate & chuyen doi kieu du lieu cho toan bo DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loai bo cac field khong khai bao trong DTO
      forbidNonWhitelisted: true, // bao loi neu client gui thua field
      transform: true, // tu dong ep kieu (vi du: query string -> number)
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Cau hinh Swagger - tai lieu API tu dong, xem tai: /api-docs
  const config = new DocumentBuilder()
    .setTitle('He thong Quan ly Sinh vien')
    .setDescription(
      'API phuc vu do an mon hoc - Quan ly Khoa, Lop, Giang vien, Sinh vien, Mon hoc va Ket qua hoc tap',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Server dang chay tai: http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger API docs tai: http://localhost:${port}/api-docs`);
}
bootstrap();
