class EmptyRequestFieldError extends Error {
  statusCode = 400;

  constructor(message) {
    super(message);
  }
}

export default EmptyRequestFieldError;
