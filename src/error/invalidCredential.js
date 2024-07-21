class InvalidCredentialsError extends Error {
  statusCode = 400;

  constructor(message = "Invalid Credentials.") {
    super(message);
  }
}

export default InvalidCredentialsError;
