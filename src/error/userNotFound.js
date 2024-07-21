class UserNotFoundError extends Error {
  statusCode = 404;

  constructor(message = "User not found") {
    super(message);
  }
}

export default UserNotFoundError;
