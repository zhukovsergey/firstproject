import express from "express";
import {
  addCommentToBlog,
  deleteBlog,
  dislikePost,
  getAllBlogs,
  getBlogBySlug,
  likePost,
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
router.post("/like/:slug", isAuthenticated, likePost);

router.post("/dislike/:slug", isAuthenticated, dislikePost);
router.post("/addcomment", isAuthenticated, addCommentToBlog);

export default router;
