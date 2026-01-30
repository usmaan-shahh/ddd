import { EmailRequiredError } from "../errors/email-required.error";
import { InvalidEmailError } from "../errors/invalid-email.error";

//Here Email class is a Value Object and Validation of Email happens only once on creation and guarantee correctness forever.

export class Email {
  
  public readonly value: string; //publicly readable but immutable once set

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
