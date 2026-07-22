import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from '../departments/department.entity';
import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';

/**
 * GIANG_VIEN - co the duoc phan cong lam Co van hoc tap / Chu nhiem cho 1 hoac nhieu Lop
 */
@Entity({ name: 'giang_vien' })
export class Teacher {
  @PrimaryColumn({ name: 'giang_vien_id', length: 10 })
  giangVienId: string;

  @Column({ name: 'ho_ten', length: 100 })
  hoTen: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ name: 'so_dien_thoai', length: 15, nullable: true })
  soDienThoai: string;

  @Column({ name: 'khoa_id', length: 10, nullable: true })
  khoaId: string;

  @ManyToOne(() => Department, (khoa) => khoa.giangViens, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'khoa_id' })
  khoa: Department;

  @OneToMany(() => Class, (lop) => lop.coVanHocTap)
  lopsPhuTrach: Class[];

  @OneToOne(() => User, (user) => user.giangVien)
  taiKhoan: User;
}
