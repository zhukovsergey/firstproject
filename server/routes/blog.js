import express from "express";
import { getAllBlogs, newblog } from "../controllers/blog.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/newblog", upload.single("image"), isAuthenticated, newblog);

router.get("/getall", getAllBlogs);

export default router;
