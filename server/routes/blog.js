import express from "express";
import {
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  newblog,
  topBlogs,
} from "../controllers/blog.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/newblog", upload.single("image"), isAuthenticated, newblog);

router.get("/getall", getAllBlogs);
router.get("/top", topBlogs);

router.get("/:slug", getBlogBySlug);
router.delete("/delete/:slug", isAuthenticated, deleteBlog);

export default router;
