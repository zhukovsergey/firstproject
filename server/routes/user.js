import express from "express";
import {
  deleteUser,
  editUserFromAdminPanel,
  getAllUsers,
  loginUser,
  logoutUser,
  register,
  updateUser,
} from "../controllers/user.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.get("/getall", isAuthenticated, getAllUsers);
router.post("/login", loginUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);
router.put("/editfromadmin/:id", isAuthenticated, editUserFromAdminPanel);
router.get("/logout", logoutUser);
router.put(
  "/edit/profile",
  upload.single("image"),
  isAuthenticated,
  updateUser
);

export default router;
