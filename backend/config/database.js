// File: backend/config/database.js
const mysql = require("mysql2");

// Buat koneksi pool (biar bisa banyak user sekaligus)
const db = mysql.createPool({
	host: process.env.DB_HOST || "localhost", // Host Docker (localhost dari luar container)
	port: process.env.DB_PORT || 3306, // Port MySQL (3307 untuk Docker)
	user: process.env.DB_USER || "root", // User MySQL
	password: process.env.DB_PASSWORD || "", // Password MySQL (kosong)
	database: process.env.DB_NAME || "db_spk_island", // Nama database
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Cek koneksi saat file ini dijalankan
db.getConnection((err, connection) => {
	if (err) {
		console.error("❌ Database Error:", err.message);
	} else {
		console.log("✅ Berhasil terkoneksi ke Database MySQL (db_spk_island)!");
		connection.release();
	}
});

module.exports = db.promise(); // Kita pakai mode Promise biar codingan rapi (async/await)
