import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';
import { Class } from '../classes/class.entity';
import { Subject } from '../subjects/subject.entity';

/**
 * KHOA - don vi quan ly Giang vien, Lop va Mon hoc
 */
@Entity({ name: 'khoa' })
export class Department {
  @PrimaryColumn({ name: 'khoa_id', length: 10 })
  khoaId: string;

  @Column({ name: 'ten_khoa', length: 100 })
  tenKhoa: string;

  @Column({ name: 'mo_ta', length: 255, nullable: true })
  moTa: string;

  @OneToMany(() => Teacher, (teacher) => teacher.khoa)
  giangViens: Teacher[];

  @OneToMany(() => Class, (lop) => lop.khoa)
  lops: Class[];

  @OneToMany(() => Subject, (monHoc) => monHoc.khoa)
  monHocs: Subject[];
}
