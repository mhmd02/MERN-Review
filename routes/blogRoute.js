import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.patch("/:id/like", likeBlog);
router.delete("/:id", deleteBlog);

export default router;
