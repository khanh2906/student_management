import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Department } from './departments/department.entity';
import { Teacher } from './teachers/teacher.entity';
import { Class } from './classes/class.entity';
import { Student } from './students/student.entity';
import { Subject } from './subjects/subject.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { User } from './users/user.entity';

import { DepartmentsModule } from './departments/departments.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Doc file .env va cung cap ConfigService cho toan bo ung dung
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Ket noi MySQL qua TypeORM, cau hinh lay tu file .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          Department,
          Teacher,
          Class,
          Student,
          Subject,
          Enrollment,
          User,
        ],
        // CHI dung true khi lam do an/hoc tap. Khi trien khai that
        // nen chuyen sang dung migration de tranh mat du lieu.
        synchronize: true,
      }),
    }),

    DepartmentsModule,
    TeachersModule,
    ClassesModule,
    StudentsModule,
    SubjectsModule,
    EnrollmentsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
