class InvalidTokenError extends Error {
  statusCode = 401;

  constructor(message) {
    super(message);
  }
}

export default InvalidTokenError;
