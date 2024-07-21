import EmptyRequestFieldError from "../error/emptyRequestField.js";

function checkForEmptyFields(req) {
  const { email, password } = req.body;

  if (!email) {
    throw new EmptyRequestFieldError(`email can't empty.`);
  }

  if (!password) {
    throw new EmptyRequestFieldError(`password can't empty.`);
  }
}

function validateUserLogin(req, res, next) {
  try {
    checkForEmptyFields(req);
    next();
  } catch (error) {
    next(error);
  }
}

export default validateUserLogin;
