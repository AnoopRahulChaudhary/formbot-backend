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

const router = express.Router();

router.post("/add", addFormDetails);
router.post("/update/:id", updatedFormDetails);
router.delete("/delete/:id", deleteForm);
router.get("/userInput/:id", getFormToFill);
router.post("/saveResponse", validateFormResponse, saveFormResponse);
router.get("/response/:id", getUserResponse);

export default router;
