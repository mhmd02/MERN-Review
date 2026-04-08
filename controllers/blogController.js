import jwt from "jsonwebtoken";
import Blog from "../models/blogs.js";
import User from "../models/users.js";

export const getAllBlogs = async (req, res) => {
  const { search, author, sortBy, order, page, limit } = req.query;
  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (author) {
    query.author = { $regex: author, $options: "i" };
  }

  const sortOptions = {};
  if (sortBy) {
    const sortingFields = ["likes"];
    if (!sortingFields.includes(sortBy)) {
      return res
        .status(400)
        .json({ error: `Sorting by ${sortBy} is not supported` });
    }

    sortOptions[sortBy] = order === "desc" ? -1 : 1;
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const totalBlogs = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .populate("user", {
      username: 1,
      name: 1,
    });

  res.json({
    metadata: {
      currentPage: pageNum,
      pageSize: blogs.length,
      totalPages: Math.ceil(totalBlogs / limitNum),
      totalBlogs: totalBlogs,
    },
    blogs,
  });
};

export const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = req.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true, runValidators: true },
  ).populate("user", { username: 1, name: 1 });

  if (!updatedBlog) {
    return res.status(404).json({ error: "blog not found" });
  }

  res.json(updatedBlog);
};

export const deleteBlog = async (req, res) => {
  const user = req.user 
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'only the creator can delete this' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  
  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()

  res.status(204).end()
}
