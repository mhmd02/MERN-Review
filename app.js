import express from "express";
import  router  from "./routes/personRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/persons", router);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
