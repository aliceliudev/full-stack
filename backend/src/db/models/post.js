import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    tags: [{ type: String }],
  },
  { timestamps: true },
);
export const Post = mongoose.model("Post", postSchema);
