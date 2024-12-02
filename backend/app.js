import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { testConnection } from "./config/database.js";
import plantRoutes from "./routes/plantRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Create uploads directory if it doesn't exist
import fs from "fs";
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(uploadsDir));
app.use("/api", plantRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
