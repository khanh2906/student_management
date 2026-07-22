import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty({ message: 'Ma lop khong duoc de trong' })
  @MaxLength(10)
  lopId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ten lop khong duoc de trong' })
  @MaxLength(50)
  tenLop: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  khoaHoc?: string;

  @IsString()
  @IsOptional()
  khoaId?: string;

  @IsString()
  @IsOptional()
  coVanId?: string;
}
