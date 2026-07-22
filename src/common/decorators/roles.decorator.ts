import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

/**
 * Decorator dung de danh dau route chi cho phep nhung Role nao duoc truy cap.
 * Vi du: @Roles(Role.ADMIN, Role.GIANGVIEN)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
