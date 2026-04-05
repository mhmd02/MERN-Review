import { Router } from "express";
import {
  getAllPersons,
  getPerson,
  addPerson,
  deletePerson,
  updatePerson,
} from "../controllers/personController.js";

const router = Router();

router.get("/", getAllPersons);
router.get("/:id", getPerson);
router.post("/", addPerson);
router.delete("/:id", deletePerson);
router.put("/:id", updatePerson);

export default router;
