import db from "../config/db";

export async function initializeDatabase() {
  try {
    console.log("Running migrations...");
    await db.migrate.latest();
    console.log("Migrations complete.");

    console.log("Running seeders...");
    await db.seed.run();
    console.log("Seeders complete.");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
}
