import express from "express";

import isAuthenticated from "./../middlewares/isAuthenticated.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/newcategory", isAuthenticated, createCategory);

router.get("/getall", getAllCategories);
router.put(
  "/editcategory",
  upload.single("image"),
  isAuthenticated,
  updateCategory
);

router.delete("/delete/:id", isAuthenticated, deleteCategory);

export default router;
