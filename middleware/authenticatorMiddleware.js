import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log("Authorization Header:", authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }

  next();
};

export const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user not found" });
  }

  req.user = user;
  next();
};
