import mongoose, { Schema, SchemaType } from "mongoose";

const formSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  flow: [{}],
  theme: {
    type: String,
    required: true,
  },
  responses: [
    {
      name: String,
      email: String,
      submittedAt: Date,
      data: Schema.Types.Mixed,
    },
  ],
  views: {
    type: Number,
  },
  starts: {
    type: Number,
  },
  completionRate: {
    type: Number,
  },
  refFolderId: {
    type: mongoose.ObjectId,
  },
  refUserId: {
    type: mongoose.ObjectId,
  },
});
