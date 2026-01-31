/** Domain errors used by auth flows. Add more as needed (e.g. UserNotFoundError, WeakPasswordError). */

export class EmailRequiredError extends Error {
  constructor() {
    super('Email is required');
  }
}

export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Invalid email: ${email}`);
  }
}

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists');
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}
