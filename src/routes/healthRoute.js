import express from "express";
import getHealthData from "../controller/healthController.js";

const router = express.Router();

router.get("/", getHealthData);

export default router;
