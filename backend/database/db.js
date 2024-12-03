import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tanamanku_massive_project",
  port: process.env.DB_PORT || 3306,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Successfully connected to MySQL database!");
    connection.release();
  } catch (error) {
    console.error("Failed to connect to MySQL database:", error);
    throw error;
  }
}

async function query(sql, params = []) {
  try {
    const [results] = await db.query(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export { db, testConnection, query };
