import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getComments, removeComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/allcomments/:id", getComments);
router.delete("/delete/:id", isAuthenticated, removeComment);

export default router;
