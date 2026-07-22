import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Ten dang nhap khong duoc de trong' })
  tenDangNhap: string;

  @IsString()
  @MinLength(6, { message: 'Mat khau phai co it nhat 6 ky tu' })
  matKhau: string;

  @IsEmail({}, { message: 'Email khong hop le' })
  @IsOptional()
  email?: string;

  @IsEnum(Role, { message: 'Vai tro khong hop le' })
  role: Role;

  // Neu dang ky tai khoan Sinh vien thi truyen MSSV; Giang vien thi truyen giangVienId
  @IsString()
  @IsOptional()
  sinhVienId?: string;

  @IsString()
  @IsOptional()
  giangVienId?: string;
}
