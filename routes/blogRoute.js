import { Router } from "express";
import { getAllBlogs, createBlog } from "../controllers/blogController.js";

const router = Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);

export default router;
