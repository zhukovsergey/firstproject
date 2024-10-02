import express from "express";

import isAuthenticated from "./../middlewares/isAuthenticated.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.js";

const router = express.Router();

router.post("/newcategory", isAuthenticated, createCategory);

router.get("/getall", isAuthenticated, getAllCategories);

router.delete("/delete/:id", isAuthenticated, deleteCategory);

export default router;
