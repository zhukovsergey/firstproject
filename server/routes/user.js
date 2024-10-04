import express from "express";
import {
  loginUser,
  logoutUser,
  register,
  updateUser,
} from "../controllers/user.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put(
  "/edit/profile",
  upload.single("image"),
  isAuthenticated,
  updateUser
);

export default router;
