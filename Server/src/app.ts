import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import leadRoutes from "./routes/leadRoutes";

const app = express();

// 🔥 FIXED CORS (works for mobile + Vercel + local)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://gig-flow-alpha-silk.vercel.app"
    ],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/leads", leadRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("GigFlow API Running...");
});

export default app;