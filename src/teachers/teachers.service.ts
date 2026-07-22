import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    const existed = await this.teacherRepo.findOne({
      where: { giangVienId: dto.giangVienId },
    });
    if (existed) {
      throw new ConflictException(
        `Ma giang vien "${dto.giangVienId}" da ton tai`,
      );
    }
    const giangVien = this.teacherRepo.create(dto);
    return this.teacherRepo.save(giangVien);
  }

  findAll(): Promise<Teacher[]> {
    return this.teacherRepo.find({ relations: ['khoa'] });
  }

  async findOne(giangVienId: string): Promise<Teacher> {
    const giangVien = await this.teacherRepo.findOne({
      where: { giangVienId },
      relations: ['khoa', 'lopsPhuTrach'],
    });
    if (!giangVien) {
      throw new NotFoundException(
        `Khong tim thay Giang vien co ma "${giangVienId}"`,
      );
    }
    return giangVien;
  }

  async update(giangVienId: string, dto: UpdateTeacherDto): Promise<Teacher> {
    const giangVien = await this.findOne(giangVienId);
    Object.assign(giangVien, dto);
    return this.teacherRepo.save(giangVien);
  }

  async remove(giangVienId: string): Promise<void> {
    const giangVien = await this.findOne(giangVienId);
    await this.teacherRepo.remove(giangVien);
  }
}
