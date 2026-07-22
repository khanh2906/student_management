import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { GioiTinh } from '../student.entity';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'MSSV khong duoc de trong' })
  @MaxLength(10)
  sinhVienId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ho ten khong duoc de trong' })
  @MaxLength(100)
  hoTen: string;

  @IsEmail({}, { message: 'Email khong hop le' })
  email: string;

  @IsDateString(
    {},
    { message: 'Ngay sinh khong hop le (dinh dang YYYY-MM-DD)' },
  )
  @IsOptional()
  ngaySinh?: string;

  @IsEnum(GioiTinh, { message: 'Gioi tinh khong hop le' })
  @IsOptional()
  gioiTinh?: GioiTinh;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  diaChi?: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  soDienThoai?: string;

  @IsString()
  @IsOptional()
  lopId?: string;
}
