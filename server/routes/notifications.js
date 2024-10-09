import express from "express";

import isAuthenticated from "./../middlewares/isAuthenticated.js";
import {
  readNotificationsForUser,
  getAllNotificationsForUser,
} from "../controllers/notification.js";

const router = express.Router();

router.get("/getallnotifications", isAuthenticated, getAllNotificationsForUser);
router.put("/readallnotifications", isAuthenticated, readNotificationsForUser);
export default router;
