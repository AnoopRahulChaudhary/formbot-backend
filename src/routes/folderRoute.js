import express from "express";
import {
  addFolder,
  deleteFolder,
  getUserFolders,
} from "../controller/folderController.js";
import validateFolderDeleteRequest from "../middleware/validateFolderDeleteRequest.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUserFolders);
router.post("/add", verifyToken, addFolder);
router.delete(
  "/delete/:id",
  verifyToken,
  validateFolderDeleteRequest,
  deleteFolder
);

export default router;
