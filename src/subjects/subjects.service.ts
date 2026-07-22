import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    const existed = await this.subjectRepo.findOne({
      where: { monHocId: dto.monHocId },
    });
    if (existed) {
      throw new ConflictException(`Ma mon hoc "${dto.monHocId}" da ton tai`);
    }
    const monHoc = this.subjectRepo.create(dto);
    return this.subjectRepo.save(monHoc);
  }

  findAll(): Promise<Subject[]> {
    return this.subjectRepo.find({ relations: ['khoa'] });
  }

  async findOne(monHocId: string): Promise<Subject> {
    const monHoc = await this.subjectRepo.findOne({
      where: { monHocId },
      relations: ['khoa'],
    });
    if (!monHoc) {
      throw new NotFoundException(`Khong tim thay Mon hoc co ma "${monHocId}"`);
    }
    return monHoc;
  }

  async update(monHocId: string, dto: UpdateSubjectDto): Promise<Subject> {
    const monHoc = await this.findOne(monHocId);
    Object.assign(monHoc, dto);
    return this.subjectRepo.save(monHoc);
  }

  async remove(monHocId: string): Promise<void> {
    const monHoc = await this.findOne(monHocId);
    await this.subjectRepo.remove(monHoc);
  }
}
