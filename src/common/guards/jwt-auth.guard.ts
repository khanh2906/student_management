import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard kiem tra Access Token (JWT) gui kem trong header Authorization: Bearer <token>
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
