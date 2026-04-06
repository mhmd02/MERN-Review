import bcrypt from "bcrypt";
import User from "../models/users.js";

export const getUsers = async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  }); 
  res.json(users);
};

export const createUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "username must be at least 3 characters long" });
  }
  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};
