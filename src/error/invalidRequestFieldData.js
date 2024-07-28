class InvalidRequestFieldDataError extends Error {
  statusCode = 400;

  constructor(message) {
    super(message);
  }
}

export default InvalidRequestFieldDataError;
