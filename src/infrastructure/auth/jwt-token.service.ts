import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { TokenPort } from 'src/application/ports/token.port';

@Injectable()
export class JwtTokenService implements TokenPort {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
