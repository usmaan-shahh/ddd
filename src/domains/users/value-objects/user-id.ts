import { randomUUID } from 'crypto';

export class UserId {
  
  private constructor(public readonly value: string) {}

  static create(value?: string): UserId {
    if (value) {
      if (!this.isValidUUID(value)) {
        throw new Error('Invalid UserId');
      }
      return new UserId(value);
    }

    return new UserId(randomUUID());
  }

  private static isValidUUID(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

}
