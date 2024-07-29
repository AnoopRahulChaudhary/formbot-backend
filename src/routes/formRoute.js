import express from "express";
import {
  addFormDetails,
  deleteForm,
  getFormToFill,
  getUserResponse,
  saveFormResponse,
  updatedFormDetails,
} from "../controller/formController.js";
import validateFormResponse from "../middleware/validateFormResponse.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addFormDetails);
router.post("/update/:id", verifyToken, updatedFormDetails);
router.delete("/delete/:id", verifyToken, deleteForm);
router.get("/userInput/:id", getFormToFill);
router.post("/saveResponse", validateFormResponse, saveFormResponse);
router.get("/response/:id", verifyToken, getUserResponse);

export default router;
