
export class AccountDisabledError extends Error {
  constructor() {
    super('Account has been disabled');
  }
}