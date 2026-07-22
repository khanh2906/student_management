import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    const existed = await this.departmentRepo.findOne({
      where: { khoaId: dto.khoaId },
    });
    if (existed) {
      throw new ConflictException(`Ma khoa "${dto.khoaId}" da ton tai`);
    }
    const khoa = this.departmentRepo.create(dto);
    return this.departmentRepo.save(khoa);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepo.find();
  }

  async findOne(khoaId: string): Promise<Department> {
    const khoa = await this.departmentRepo.findOne({
      where: { khoaId },
      relations: ['giangViens', 'lops', 'monHocs'],
    });
    if (!khoa) {
      throw new NotFoundException(`Khong tim thay Khoa co ma "${khoaId}"`);
    }
    return khoa;
  }

  async update(khoaId: string, dto: UpdateDepartmentDto): Promise<Department> {
    const khoa = await this.findOne(khoaId);
    Object.assign(khoa, dto);
    return this.departmentRepo.save(khoa);
  }

  async remove(khoaId: string): Promise<void> {
    const khoa = await this.findOne(khoaId);
    await this.departmentRepo.remove(khoa);
  }
}
