"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected route
router.get("/private", authMiddleware_1.protect, (req, res) => {
    res.json({
        success: true,
        message: "You accessed protected route 🔥",
    });
});
exports.default = router;
