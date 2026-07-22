import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  @IsNotEmpty({ message: 'MSSV khong duoc de trong' })
  sinhVienId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ma mon hoc khong duoc de trong' })
  monHocId: string;

  @IsString()
  @IsNotEmpty({ message: 'Hoc ky khong duoc de trong' })
  @MaxLength(20)
  hocKy: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  diemSo?: number;
}
