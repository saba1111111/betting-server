import app from "./app";
import { initializeDatabase } from "./database/init";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database. Exiting...");
    process.exit(1);
  });
