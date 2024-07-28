export class ApiResponse {
  constructor(statusCode, data, message = "Success", type) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;

    switch (type) {
      case "user":
        this.user = data;
        break;
      case "to-do":
        this.toDo = data;
        break;
      case "to-do-array":
        this.toDoArray = data;
        break;
      default:
        this.data = data;
        break;
    }
  }
}
