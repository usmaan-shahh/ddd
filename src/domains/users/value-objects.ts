import { randomUUID } from 'crypto';
import { EmailRequiredError, InvalidEmailError } from './errors';

export class Email {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(email: string): Email {
    if (!email) throw new EmailRequiredError();
    const normalized = email.trim().toLowerCase();
    if (!Email.isValid(normalized)) throw new InvalidEmailError(normalized);
    return new Email(normalized);
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

export class Password {
  public readonly value: string;

  private constructor(hashedPassword: string) {
    this.value = hashedPassword;
  }

  static create(hashedPassword: string): Password {
    if (!hashedPassword) throw new Error('Password is required');
    if (hashedPassword.length < 20) throw new Error('Password must be hashed');
    return new Password(hashedPassword);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
}

export class UserId {
  private constructor(public readonly value: string) {}

  static create(value?: string): UserId {
    if (value) {
      if (!UserId.isValidUUID(value)) throw new Error('Invalid UserId');
      return new UserId(value);
    }
    return new UserId(randomUUID());
  }

  static from(id: string): UserId {
    return new UserId(id);
  }

  private static isValidUUID(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
