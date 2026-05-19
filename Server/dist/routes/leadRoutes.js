"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const router = express_1.default.Router();
router.post("/create", leadController_1.createLead);
router.get("/", leadController_1.getLeads);
router.delete("/:id", leadController_1.deleteLead);
router.put("/:id", leadController_1.updateLead);
exports.default = router;
