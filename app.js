import express from "express";
import  router  from "./routes/personRoutes.js";
import { getInfo } from './controllers/personController.js';

const app = express();

app.use(express.json());

app.get('/info', getInfo);
app.use("/api/persons", router);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
