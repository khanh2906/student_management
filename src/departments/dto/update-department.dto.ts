import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';

// Khi cap nhat thi khong cho phep sua khoaId (khoa chinh)
export class UpdateDepartmentDto extends PartialType(
  OmitType(CreateDepartmentDto, ['khoaId'] as const),
) {}
