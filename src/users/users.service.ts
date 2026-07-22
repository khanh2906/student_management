import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../common/enums/role.enum';

export interface CreateUserInput {
  tenDangNhap: string;
  matKhau: string; // da duoc hash truoc khi truyen vao day
  email?: string;
  role: Role;
  sinhVienId?: string;
  giangVienId?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findByUsername(tenDangNhap: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { tenDangNhap } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['sinhVien', 'giangVien'],
    });
    if (!user) {
      throw new NotFoundException(`Khong tim thay Tai khoan id=${id}`);
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['sinhVien', 'giangVien'] });
  }

  create(input: CreateUserInput): Promise<User> {
    const user = this.userRepo.create(input);
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
  }
}
