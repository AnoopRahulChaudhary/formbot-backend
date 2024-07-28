import User from "../model/User.js";
import { encodeSecret, matchSecret } from "../../util/secretManagement.js";
import UserNotFoundError from "../error/userNotFound.js";
import InvalidCredentialsError from "../error/invalidCredential.js";
import { generateToken } from "../../util/jwtTokenManagement.js";

async function registerUser(req, res, next) {
  try {
    const hash = await encodeSecret(req.body.password);
    const user = new User({ ...req.body, password: hash });
    user.save();
    const token = generateToken(user);
    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserNotFoundError();
    }

    const isSecretMatch = await matchSecret(password, user.password);
    if (!isSecretMatch) {
      throw new InvalidCredentialsError();
    }

    const token = generateToken(user);
    res.status(200).json({
      message: "login successful",
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
}

export { registerUser, loginUser };
