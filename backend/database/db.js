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
		await db.getConnection()
		console.log("Berhasil terhubung ke database !");
	} catch (e) {
		console.error("Gagal terhubung ke database !", e);
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
