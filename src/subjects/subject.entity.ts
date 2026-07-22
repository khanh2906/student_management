import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from '../departments/department.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

/**
 * MON_HOC - danh muc cac mon hoc, thuoc 1 Khoa quan ly
 */
@Entity({ name: 'mon_hoc' })
export class Subject {
  @PrimaryColumn({ name: 'mon_hoc_id', length: 10 })
  monHocId: string;

  @Column({ name: 'ten_mon_hoc', length: 100 })
  tenMonHoc: string;

  @Column({ name: 'so_tin_chi', type: 'int', default: 3 })
  soTinChi: number;

  @Column({ name: 'khoa_id', length: 10, nullable: true })
  khoaId: string;

  @ManyToOne(() => Department, (khoa) => khoa.monHocs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'khoa_id' })
  khoa: Department;

  @OneToMany(() => Enrollment, (ketQua) => ketQua.monHoc)
  ketQuaHocTaps: Enrollment[];
}
