import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: number; // userId
  tenDangNhap: string;
  role: string;
  sinhVienId?: string;
  giangVienId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'secret',
    });
  }

  // Gia tri tra ve o day se duoc gan vao request.user
  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      tenDangNhap: payload.tenDangNhap,
      role: payload.role,
      sinhVienId: payload.sinhVienId,
      giangVienId: payload.giangVienId,
    };
  }
}
