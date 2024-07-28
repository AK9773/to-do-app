export class ApiError extends Error {
  constructor(statusCode, message = "Somethoing went wrong") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
  }
}
