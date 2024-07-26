import express from "express";
import { addFormDetails, getFormToFill } from "../controller/formController.js";

const router = express.Router();

router.post("/add", addFormDetails);
router.get("/userInput/:id", getFormToFill);

export default router;
