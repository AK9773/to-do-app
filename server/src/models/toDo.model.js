import mongoose, { Schema } from "mongoose";

const toDoSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ToDo", "InProgress", "Done"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export const ToDo = mongoose.model("ToDo", toDoSchema);
