import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const db = mysql2.createPool({
	host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.PASSWORD_DATABASE || "",
    database: process.env.DB_NAME || "tanamanku_massive_project",
});

async function testConnection() {
	try {
	  console.log("Testing MySQL connection...");
	  const connection = await db.getConnection();
	  console.log("Successfully connected to MySQL database!");
	  connection.release();
	} catch (error) {
	  console.error("Error connecting to MySQL database:");
	  console.error("Host:", process.env.DB_HOST || "localhost");
	  console.error("User:", process.env.DB_USER || "root");
	  console.error("Database:", process.env.DB_NAME || "tanamanku_massive_project");
	  console.error("Port:", process.env.DB_PORT || 3306);
	  console.error(error);
	}
  }
  

async function query(command, values) {
	try {
		const [value] = await db.query(command, values ?? []);
		return value;
	} catch (e) {
		console.e(e);
	}
}

export {db, testConnection, query};
