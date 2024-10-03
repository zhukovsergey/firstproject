import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "commentedAt",
    },
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
