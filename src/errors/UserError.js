export default class UserError extends Error {
  constructor(msg, errors) {
    super(msg);
    this.errors = errors || [];
  }
}
