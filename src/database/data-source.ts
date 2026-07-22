import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { Department } from '../departments/department.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Class } from '../classes/class.entity';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { User } from '../users/user.entity';

loadEnv();

/**
 * Cau hinh ket noi Database dung chung cho:
 * - NestJS app (import trong app.module.ts)
 * - Script seed du lieu mau (npm run seed)
 */
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'student_management',
  entities: [Department, Teacher, Class, Student, Subject, Enrollment, User],
  // CHI dung synchronize=true trong moi truong DEV/hoc tap.
  // KHONG duoc bat synchronize trong production (co the mat du lieu).
  synchronize: true,
  logging: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
