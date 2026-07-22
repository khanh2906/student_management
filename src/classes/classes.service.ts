import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto): Promise<Class> {
    const existed = await this.classRepo.findOne({
      where: { lopId: dto.lopId },
    });
    if (existed) {
      throw new ConflictException(`Ma lop "${dto.lopId}" da ton tai`);
    }
    const lop = this.classRepo.create(dto);
    return this.classRepo.save(lop);
  }

  findAll(): Promise<Class[]> {
    return this.classRepo.find({ relations: ['khoa', 'coVanHocTap'] });
  }

  async findOne(lopId: string): Promise<Class> {
    const lop = await this.classRepo.findOne({
      where: { lopId },
      relations: ['khoa', 'coVanHocTap', 'sinhViens'],
    });
    if (!lop) {
      throw new NotFoundException(`Khong tim thay Lop co ma "${lopId}"`);
    }
    return lop;
  }

  async update(lopId: string, dto: UpdateClassDto): Promise<Class> {
    const lop = await this.findOne(lopId);
    Object.assign(lop, dto);
    return this.classRepo.save(lop);
  }

  async remove(lopId: string): Promise<void> {
    const lop = await this.findOne(lopId);
    await this.classRepo.remove(lop);
  }
}
