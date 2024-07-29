class InvalidIdError extends Error {
  statusCode = 400;

  constructor(message) {
    super(message);
  }
}

export default InvalidIdError;
