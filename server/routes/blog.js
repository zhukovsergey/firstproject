import express from "express";
import {
  addCommentToBlog,
  deleteBlog,
  dislikePost,
  editblog,
  getAllBlogs,
  getBlogBySlug,
  likePost,
  newblog,
  searchBlogs,
  topBlogs,
} from "../controllers/blog.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/newblog", upload.single("image"), isAuthenticated, newblog);
router.put("/editblog", upload.single("image"), isAuthenticated, editblog);

router.get("/getall", getAllBlogs);
router.get("/top", topBlogs);

router.get("/:slug", getBlogBySlug);
router.delete("/delete/:slug", isAuthenticated, deleteBlog);
router.post("/like/:slug", isAuthenticated, likePost);

router.post("/dislike/:slug", isAuthenticated, dislikePost);
router.post("/addcomment", isAuthenticated, addCommentToBlog);
router.post("/search", searchBlogs);

export default router;
