import express from "express";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Protected route
router.get("/private", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed protected route 🔥",
  });
});

export default router;