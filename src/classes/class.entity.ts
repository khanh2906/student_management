import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from '../departments/department.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Student } from '../students/student.entity';

/**
 * LOP - moi Lop thuoc 1 Khoa va co 1 Giang vien lam Co van hoc tap (CVHT)
 */
@Entity({ name: 'lop' })
export class Class {
  @PrimaryColumn({ name: 'lop_id', length: 10 })
  lopId: string;

  @Column({ name: 'ten_lop', length: 50 })
  tenLop: string;

  @Column({ name: 'khoa_hoc', length: 10, nullable: true })
  khoaHoc: string; // vi du: "2023-2027"

  @Column({ name: 'khoa_id', length: 10, nullable: true })
  khoaId: string;

  @ManyToOne(() => Department, (khoa) => khoa.lops, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'khoa_id' })
  khoa: Department;

  @Column({ name: 'co_van_id', length: 10, nullable: true })
  coVanId: string;

  @ManyToOne(() => Teacher, (giangVien) => giangVien.lopsPhuTrach, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'co_van_id' })
  coVanHocTap: Teacher;

  @OneToMany(() => Student, (sinhVien) => sinhVien.lop)
  sinhViens: Student[];
}
