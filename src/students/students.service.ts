import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const existed = await this.studentRepo.findOne({
      where: { sinhVienId: dto.sinhVienId },
    });
    if (existed) {
      throw new ConflictException(`MSSV "${dto.sinhVienId}" da ton tai`);
    }
    const sinhVien = this.studentRepo.create(dto);
    return this.studentRepo.save(sinhVien);
  }

  findAll(): Promise<Student[]> {
    return this.studentRepo.find({ relations: ['lop'] });
  }

  async findOne(sinhVienId: string): Promise<Student> {
    const sinhVien = await this.studentRepo.findOne({
      where: { sinhVienId },
      relations: ['lop', 'lop.khoa', 'ketQuaHocTaps', 'ketQuaHocTaps.monHoc'],
    });
    if (!sinhVien) {
      throw new NotFoundException(
        `Khong tim thay Sinh vien co MSSV "${sinhVienId}"`,
      );
    }
    return sinhVien;
  }

  /** Tim tat ca sinh vien thuoc 1 Lop - dung cho Giang vien xem danh sach lop minh phu trach */
  findByLop(lopId: string): Promise<Student[]> {
    return this.studentRepo.find({ where: { lopId }, relations: ['lop'] });
  }

  async update(sinhVienId: string, dto: UpdateStudentDto): Promise<Student> {
    const sinhVien = await this.findOne(sinhVienId);
    Object.assign(sinhVien, dto);
    return this.studentRepo.save(sinhVien);
  }

  async remove(sinhVienId: string): Promise<void> {
    const sinhVien = await this.findOne(sinhVienId);
    await this.studentRepo.remove(sinhVien);
  }
}
