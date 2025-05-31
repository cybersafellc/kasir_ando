class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class PageError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ApiError, PageError };
