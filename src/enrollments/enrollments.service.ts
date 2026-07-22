import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    const existed = await this.enrollmentRepo.findOne({
      where: {
        sinhVienId: dto.sinhVienId,
        monHocId: dto.monHocId,
        hocKy: dto.hocKy,
      },
    });
    if (existed) {
      throw new ConflictException(
        `Sinh vien "${dto.sinhVienId}" da co ket qua mon "${dto.monHocId}" trong hoc ky "${dto.hocKy}"`,
      );
    }
    const ketQua = this.enrollmentRepo.create(dto);
    return this.enrollmentRepo.save(ketQua);
  }

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({ relations: ['sinhVien', 'monHoc'] });
  }

  /** Bang diem cua 1 sinh vien */
  findBySinhVien(sinhVienId: string): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      where: { sinhVienId },
      relations: ['monHoc'],
    });
  }

  /** Danh sach ket qua cua 1 mon hoc (vi du: giang vien xem diem ca lop) */
  findByMonHoc(monHocId: string): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      where: { monHocId },
      relations: ['sinhVien'],
    });
  }

  async findOne(id: number): Promise<Enrollment> {
    const ketQua = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['sinhVien', 'monHoc'],
    });
    if (!ketQua) {
      throw new NotFoundException(`Khong tim thay Ket qua hoc tap id=${id}`);
    }
    return ketQua;
  }

  async update(id: number, dto: UpdateEnrollmentDto): Promise<Enrollment> {
    const ketQua = await this.findOne(id);
    Object.assign(ketQua, dto);
    return this.enrollmentRepo.save(ketQua);
  }

  async remove(id: number): Promise<void> {
    const ketQua = await this.findOne(id);
    await this.enrollmentRepo.remove(ketQua);
  }
}
