import express from "express";
import {
  addCommentToBlog,
  deleteBlog,
  dislikePost,
  editblog,
  getAllBlogs,
  getBlogByCategory,
  getBlogBySlug,
  getSimilarBlogs,
  likePost,
  newblog,
  searchBlogs,
  topBlogs,
  topCommentsBlogs,
} from "../controllers/blog.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/newblog", upload.single("image"), isAuthenticated, newblog);
router.put("/editblog", upload.single("image"), isAuthenticated, editblog);

router.get("/getall", getAllBlogs);
router.post("/similar/:category", getSimilarBlogs);
router.get("/top", topBlogs);
router.get("/topcomments", topCommentsBlogs);

router.get("/:slug", getBlogBySlug);
router.delete("/delete/:slug", isAuthenticated, deleteBlog);
router.post("/like/:slug", isAuthenticated, likePost);

router.post("/dislike/:slug", isAuthenticated, dislikePost);
router.post("/addcomment", isAuthenticated, addCommentToBlog);
router.post("/search", searchBlogs);

router.get("/category/:slug", getBlogByCategory);

export default router;
