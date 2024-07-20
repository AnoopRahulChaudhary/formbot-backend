class UserExistBeforeRegistrationError extends Error {
  statusCode = 409;

  constructor(message) {
    super(message);
  }
}

export default UserExistBeforeRegistrationError;
