import express from "express";
import mongoose from "mongoose";
import routes from "./routes/blogRoute.js";


const app = express();

const mongoUrl = process.env.URI;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.error("error connecting to MongoDB:", error.message),
  );

app.use(express.json());

app.use("/api/blogs", routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
