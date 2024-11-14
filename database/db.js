import mysql2 from "mysql2/promise";

const db = mysql2.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "tanamanku_massive_project",
});

async function testConnection() {
	try {
		await db.getConnection()
		console.log("Berhasil terhubung ke database !");
	} catch (e) {
		console.e("Gagal terhubung ke database !", e);
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
