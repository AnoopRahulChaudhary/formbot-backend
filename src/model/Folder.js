import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  refUserId: {
    type: mongoose.ObjectId,
  },
});

const folder = mongoose.model("Folder", folderSchema);

export default folder;
