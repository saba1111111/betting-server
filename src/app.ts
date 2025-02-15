import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import eventsRoutes from "./modules/events/events.routes";
import { authenticateToken } from "./middleware/auth";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", authenticateToken, eventsRoutes);

export default app;
