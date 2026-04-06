import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  likeBlog,
} from "../controllers/blogController.js";

const router = Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.patch("/:id/like", likeBlog);

export default router;
