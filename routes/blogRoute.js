import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { userExtractor } from "../middleware/authenticatorMiddleware.js";

const router = Router();

router.get("/", getAllBlogs);
router.post("/", userExtractor, createBlog);
router.patch("/:id/like", likeBlog);
router.delete("/:id", userExtractor, deleteBlog);

export default router;
