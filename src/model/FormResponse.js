import mongoose, { Schema } from "mongoose";

const formResponseSchema = new mongoose.Schema({
  submittedAt: {
    type: Date,
  },
  inputsValue: {},
  state: {
    type: String,
    enum: ["EMPTY", "STARTED", "COMPLETED"],
    default: "EMPTY",
  },
  refFormId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const formResponse = mongoose.model("FormResponse", formResponseSchema);

export default formResponse;
