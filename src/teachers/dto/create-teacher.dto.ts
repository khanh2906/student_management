import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty({ message: 'Ma giang vien khong duoc de trong' })
  @MaxLength(10)
  giangVienId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ho ten khong duoc de trong' })
  @MaxLength(100)
  hoTen: string;

  @IsEmail({}, { message: 'Email khong hop le' })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  soDienThoai?: string;

  @IsString()
  @IsOptional()
  khoaId?: string;
}
