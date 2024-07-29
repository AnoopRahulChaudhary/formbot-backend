import express from "express";
import { addFolder, deleteFolder } from "../controller/folderController";
import validateFolderDeleteRequest from "../middleware/validateFolderDeleteRequest";

const router = express.Router();

router.post("/add", addFolder);
router.delete("/delete/:id", validateFolderDeleteRequest, deleteFolder);

export default router;
