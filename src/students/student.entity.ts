import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../classes/class.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { User } from '../users/user.entity';

export enum GioiTinh {
  NAM = 'Nam',
  NU = 'Nu',
  KHAC = 'Khac',
}

/**
 * SINH_VIEN - thuc the trung tam cua he thong Quan ly Sinh vien.
 * SID (MSSV) la khoa chinh, giong vi du cua de bai (STUDENT.SID)
 */
@Entity({ name: 'sinh_vien' })
export class Student {
  @PrimaryColumn({ name: 'sinh_vien_id', length: 10 })
  sinhVienId: string; // MSSV

  @Column({ name: 'ho_ten', length: 100 })
  hoTen: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    name: 'ngay_sinh',
    type: 'date',
    nullable: true,
  })
  ngaySinh: string;

  @Column({
    name: 'gioi_tinh',
    type: 'enum',
    enum: GioiTinh,
    default: GioiTinh.KHAC,
  })
  gioiTinh: GioiTinh;

  @Column({ name: 'dia_chi', length: 255, nullable: true })
  diaChi: string;

  @Column({ name: 'so_dien_thoai', length: 15, nullable: true })
  soDienThoai: string;

  @Column({ name: 'lop_id', length: 10, nullable: true })
  lopId: string;

  @ManyToOne(() => Class, (lop) => lop.sinhViens, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lop_id' })
  lop: Class;

  @OneToMany(() => Enrollment, (ketQua) => ketQua.sinhVien)
  ketQuaHocTaps: Enrollment[];

  @OneToOne(() => User, (user) => user.sinhVien)
  taiKhoan: User;
}
