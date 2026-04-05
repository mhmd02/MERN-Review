import express from "express";
import  router  from "./routes/personRoutes.js";
import { getInfo } from './controllers/personController.js';
import errorHandler from './uitility.js';

const app = express();

app.use(express.json());
app.get('/info', getInfo);
app.use("/api/persons", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



