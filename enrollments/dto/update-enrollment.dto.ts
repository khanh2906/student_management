import { IsNumber, IsOptional, Min, Max } from 'class-validator';

// Cap nhat ket qua hoc tap - chu yeu la sua diem so
export class UpdateEnrollmentDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  diemSo?: number;
}
