import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blog",
    },
    notification_for: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
