import express from "express";
import {
  createLead,
  getLeads,
  deleteLead,
  updateLead,
} from "../controllers/leadController";
import { protect } from "../middleware/authMiddleware";


const router = express.Router();


router.post("/create", createLead);
router.get("/", getLeads);
router.delete("/:id", deleteLead);
router.put("/:id", updateLead);

export default router;