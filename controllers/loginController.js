import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // Token expires in 1 hour
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: "1h" });

  res.status(200).send({ token, username: user.username, name: user.name });
};
