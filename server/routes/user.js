import express from "express";
import { loginUser, logoutUser, register } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
