import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../common/enums/role.enum';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';

/**
 * TAI_KHOAN - dung de dang nhap he thong (JWT Auth).
 * - role = admin: quan tri toan he thong
 * - role = giangvien: lien ket toi 1 Giang vien (giangVienId)
 * - role = sinhvien: lien ket toi 1 Sinh vien (sinhVienId)
 */
@Entity({ name: 'tai_khoan' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ten_dang_nhap', length: 50, unique: true })
  tenDangNhap: string;

  @Exclude() // khong bao gio tra password ve cho client
  @Column({ name: 'mat_khau', length: 255 })
  matKhau: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.SINHVIEN })
  role: Role;

  @Column({ name: 'sinh_vien_id', length: 10, nullable: true })
  sinhVienId: string;

  @OneToOne(() => Student, (sinhVien) => sinhVien.taiKhoan, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'sinh_vien_id' })
  sinhVien: Student;

  @Column({ name: 'giang_vien_id', length: 10, nullable: true })
  giangVienId: string;

  @OneToOne(() => Teacher, (giangVien) => giangVien.taiKhoan, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'giang_vien_id' })
  giangVien: Teacher;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
