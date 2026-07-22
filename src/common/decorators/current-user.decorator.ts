import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator lay thong tin user hien tai (da duoc JwtStrategy gan vao request.user)
 * Vi du su dung: getProfile(@CurrentUser() user: any) { ... }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
