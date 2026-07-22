import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Ma mon hoc khong duoc de trong' })
  @MaxLength(10)
  monHocId: string;

  @IsString()
  @IsNotEmpty({ message: 'Ten mon hoc khong duoc de trong' })
  @MaxLength(100)
  tenMonHoc: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  soTinChi?: number;

  @IsString()
  @IsOptional()
  khoaId?: string;
}
