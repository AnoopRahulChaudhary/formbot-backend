import User from "../model/User.js";

async function registerUser(req, res, next) {
  try {
    const user = new User({ ...req.body });
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
