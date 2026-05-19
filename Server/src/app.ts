import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import leadRoutes from "./routes/leadRoutes";

const app = express();

// 1. Middleware FIRST
app.use(cors());
app.use(express.json());

// 2. Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);

// 3. Default route
app.get("/", (req, res) => {
  res.send("GigFlow API Running...");
});

export default app;