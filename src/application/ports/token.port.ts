export const TOKEN = Symbol('TokenPort');

export interface TokenPort {
    generateAccessToken(payload: { userId: string }): string;
    generateRefreshToken(payload: { userId: string }): string;
  }
  