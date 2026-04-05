import Blog from "../models/blogs.js";

export const getAllBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

export const createBlog = (request, response) => {
  console.log("This is a post request");
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};
