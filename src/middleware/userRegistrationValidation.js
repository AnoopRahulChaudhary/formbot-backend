import User from "../model/User.js";
import EmptyRequestFieldError from "../error/emptyRequestField.js";
import UserExistBeforeRegistrationError from "../error/userExistBeforeRegistration.js";

function checkForEmptyFields(req) {
  const { username, email, password } = req.body;

  if (!username) {
    throw new EmptyRequestFieldError(`username can't empty`);
  }

  if (!email) {
    throw new EmptyRequestFieldError(`email can't empty`);
  }

  if (!password) {
    throw new EmptyRequestFieldError(`password can't empty`);
  }
}

async function checkForExistingUser(userEmail) {
  const existingUser = await User.findOne({ email: userEmail });
  if (existingUser) {
    throw new UserExistBeforeRegistrationError(
      "User already exist with same email, try with different email."
    );
  }
}

async function validateUserRegistration(req, res, next) {
  try {
    checkForEmptyFields(req);
    await checkForExistingUser(req.body.email);
    next();
  } catch (error) {
    next(error);
  }
}

export default validateUserRegistration;
