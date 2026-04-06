import Blog from "../models/blogs.js";
import User from "../models/users.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const body = req.body;

  const user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
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
