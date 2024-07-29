import Folder from "../model/Folder";
import { deleteFormsUnderFolder } from "./formController";

async function addFolder(req, res, next) {
  try {
    const folder = new Folder({ ...req.body });
    await folder.save();
    res.status(201).json({
      status: "Success",
      message: "Form added successfully",
      folderId: folder._id,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteFolder(req, res, next) {
  try {
    const folderId = req.param.folderId;
    console.debug(`Deleting folder under id ${folderId}`);
    await deleteFormsUnderFolder(folderId);
    const deletedFolder = await Folder.findByIdAndDelete(folderId);
    if (!deletedFolder) {
      throw Error(`Error in deleting folder with id ${folderId}`);
    }

    res.status(200).json({
      status: "Success",
      message: "folder deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { addFolder, deleteFolder };
