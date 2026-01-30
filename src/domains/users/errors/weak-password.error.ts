
export class WeakPasswordError extends Error {
  constructor() {
    super('Password does not meet security requirements');
  }
}
