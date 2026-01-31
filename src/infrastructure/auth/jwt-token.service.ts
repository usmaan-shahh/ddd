import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { TokenPort } from '../../application/ports/auth.ports';

@Injectable()
export class JwtTokenService implements TokenPort {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  generateAccessToken(payload: { userId: string }): string {
    const expiresInSeconds = this.config.get<number>('JWT_ACCESS_EXPIRY_SEC', 15 * 60);
    return this.jwtService.sign(payload, { expiresIn: expiresInSeconds });
  }

  generateRefreshToken(payload: { userId: string }): string {
    const expiresInSeconds = this.config.get<number>('JWT_REFRESH_EXPIRY_SEC', 7 * 24 * 60 * 60);
    return this.jwtService.sign(payload, { expiresIn: expiresInSeconds });
  }
}
