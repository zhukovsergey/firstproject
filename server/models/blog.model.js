import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
