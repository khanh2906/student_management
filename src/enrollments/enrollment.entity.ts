import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';

/**
 * KET_QUA_HOC_TAP - bang trung gian (associative entity) the hien quan he N-N
 * giua SINH_VIEN va MON_HOC, tuong tu vai tro cua StudentNote trong vi du de bai.
 * Moi dong la ket qua cua 1 Sinh vien doi voi 1 Mon hoc trong 1 hoc ky.
 */
@Entity({ name: 'ket_qua_hoc_tap' })
@Unique(['sinhVienId', 'monHocId', 'hocKy'])
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sinh_vien_id', length: 10 })
  sinhVienId: string;

  @ManyToOne(() => Student, (sinhVien) => sinhVien.ketQuaHocTaps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sinh_vien_id' })
  sinhVien: Student;

  @Column({ name: 'mon_hoc_id', length: 10 })
  monHocId: string;

  @ManyToOne(() => Subject, (monHoc) => monHoc.ketQuaHocTaps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mon_hoc_id' })
  monHoc: Subject;

  @Column({ name: 'hoc_ky', length: 20 })
  hocKy: string; // vi du: "HK1 2025-2026"

  @Column({
    name: 'diem_so',
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
  })
  diemSo: number;
}
