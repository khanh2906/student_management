import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Ma khoa khong duoc de trong' })
  @MaxLength(10)
  khoaId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ten khoa khong duoc de trong' })
  @MaxLength(100)
  tenKhoa: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  moTa?: string;
}
