import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existed = await this.usersService.findByUsername(dto.tenDangNhap);
    if (existed) {
      throw new ConflictException(
        `Ten dang nhap "${dto.tenDangNhap}" da ton tai`,
      );
    }

    const hashed = await bcrypt.hash(dto.matKhau, 10);
    const user = await this.usersService.create({
      tenDangNhap: dto.tenDangNhap,
      matKhau: hashed,
      email: dto.email,
      role: dto.role,
      sinhVienId: dto.sinhVienId,
      giangVienId: dto.giangVienId,
    });

    return this.buildTokenResponse(user.id, user.tenDangNhap, user.role, {
      sinhVienId: user.sinhVienId,
      giangVienId: user.giangVienId,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.tenDangNhap);
    if (!user) {
      throw new UnauthorizedException('Ten dang nhap hoac mat khau sai');
    }

    const isMatch = await bcrypt.compare(dto.matKhau, user.matKhau);
    if (!isMatch) {
      throw new UnauthorizedException('Ten dang nhap hoac mat khau sai');
    }

    return this.buildTokenResponse(user.id, user.tenDangNhap, user.role, {
      sinhVienId: user.sinhVienId,
      giangVienId: user.giangVienId,
    });
  }

  private buildTokenResponse(
    userId: number,
    tenDangNhap: string,
    role: string,
    extra: { sinhVienId?: string; giangVienId?: string },
  ) {
    const payload: JwtPayload = {
      sub: userId,
      tenDangNhap,
      role,
      ...extra,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId,
        tenDangNhap,
        role,
        ...extra,
      },
    };
  }
}
