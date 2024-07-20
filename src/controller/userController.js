import User from "../model/User.js";
import { encodeSecret } from "../../util/secretManagement.js";

async function registerUser(req, res, next) {
  try {
    const hash = await encodeSecret(req.body.password);
    const user = new User({ ...req.body, password: hash });
    user.save();
    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      message: "Failed to register user",
    });
  }
}

export { registerUser };
