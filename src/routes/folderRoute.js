import express from "express";
import { addFolder, deleteFolder } from "../controller/folderController";
import validateFolderDeleteRequest from "../middleware/validateFolderDeleteRequest";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/add", verifyToken, addFolder);
router.delete(
  "/delete/:id",
  verifyToken,
  validateFolderDeleteRequest,
  deleteFolder
);

export default router;
