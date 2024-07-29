import InvalidIdError from "../error/invalidId";
import Folder from "../model/Folder";

async function validateFolderDeleteRequest(req, res, next) {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      throw new InvalidIdError("Invalid folder id.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default validateFolderDeleteRequest;
