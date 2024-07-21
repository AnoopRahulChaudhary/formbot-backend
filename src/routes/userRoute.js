import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import validateUserRegistration from "../middleware/userRegistrationValidation.js";
import validateUserLogin from "../middleware/validateUserLogin.js";

const router = express.Router();

router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);

export default router;
