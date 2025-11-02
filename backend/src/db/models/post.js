import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true },
);
export const Post = mongoose.model("Post", postSchema);
