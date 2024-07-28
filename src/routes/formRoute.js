import express from "express";
import {
  addFormDetails,
  getFormToFill,
  saveFormResponse,
} from "../controller/formController.js";
import validateFormResponse from "../middleware/validateFormResponse.js";

const router = express.Router();

router.post("/add", addFormDetails);
router.get("/userInput/:id", getFormToFill);
router.post("/saveResponse", validateFormResponse, saveFormResponse);

export default router;
