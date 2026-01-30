export class Password {

  public readonly value: string;

  private constructor(hashedPassword: string) {
    this.value = hashedPassword;
  }

  /* Domain should only accepts hashed passwords*/

  static create(hashedPassword: string): Password {
    if (!hashedPassword) {
      throw new Error('Password is required');
    }

    if (hashedPassword.length < 20) {
      throw new Error('Password must be hashed');
    }

    return new Password(hashedPassword);
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
  
}
