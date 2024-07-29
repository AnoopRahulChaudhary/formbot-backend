import mongoose, { Schema } from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flow: [{}],
  theme: {
    name: String,
    color: String,
  },
  refFolderId: {
    type: mongoose.ObjectId,
  },
  refUserId: {
    type: mongoose.ObjectId,
  },
});

const form = mongoose.model("Form", formSchema);

export default form;
