import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getComments } from "../controllers/comments.js";

const router = express.Router();

router.post("/allcomments/:id", getComments);

export default router;
