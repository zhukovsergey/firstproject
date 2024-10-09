import { Notification } from "../models/notification.model.js";

export const getAllNotificationsForUser = async (req, res) => {
  try {
    const notifications = await Notification.find({
      notification_for: req.id,
      seen: false,
    })
      .populate("blog")
      .populate("user")
      .populate("comment");

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
  }
};

export const readNotificationsForUser = async (req, res) => {
  console.log(req.id);
  try {
    const notifications = await Notification.updateMany(
      { notification_for: req.id, seen: false },
      { seen: true }
    );
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
  }
};
