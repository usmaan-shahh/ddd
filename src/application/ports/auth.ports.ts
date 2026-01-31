export const PASSWORD_HASHER = Symbol('PasswordHasherPort');
export const TOKEN_PORT = Symbol('TokenPort');

export interface PasswordHasherPort {
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

export interface TokenPort {
  generateAccessToken(payload: { userId: string }): string;
  generateRefreshToken(payload: { userId: string }): string;
}
