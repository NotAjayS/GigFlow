"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const app = (0, express_1.default)();
// 1. Middleware FIRST
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 2. Routes AFTER middleware
app.use("/api/auth", authRoutes_1.default);
app.use("/api/test", testRoutes_1.default);
app.use("/api/leads", leadRoutes_1.default);
// 3. Default route
app.get("/", (req, res) => {
    res.send("GigFlow API Running...");
});
exports.default = app;
