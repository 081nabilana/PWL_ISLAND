const db = require("../config/database");

// AMBIL SEMUA NILAI (Untuk perhitungan Promethee)
exports.getAllScores = async (req, res) => {
	try {
		const [rows] = await db.query("SELECT * FROM scores");
		res.json(rows);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// AMBIL NILAI PER KOTA (Untuk ditampilkan di form edit)
exports.getScoresByCity = async (req, res) => {
	try {
		const cityId = req.params.cityId;
		// Kita join biar dapat nama kriterianya juga
		const query = `
            SELECT s.criteria_id, s.value, c.name, c.code 
            FROM scores s
            JOIN criteria c ON s.criteria_id = c.id
            WHERE s.city_id = ?
        `;
		const [rows] = await db.query(query, [cityId]);
		res.json(rows);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

// SIMPAN NILAI (Bulk Insert)
exports.saveScores = async (req, res) => {
	const { city_id, scores } = req.body;
	// scores bentuknya array: [{ criteria_id: 1, value: 50 }, { criteria_id: 2, value: 80 }]

	if (!scores || scores.length === 0) {
		return res.status(400).json({ msg: "Data nilai kosong!" });
	}

	const connection = await db.getConnection();
	try {
		await connection.beginTransaction();

		// 1. Hapus nilai lama kota ini (Reset)
		await connection.query("DELETE FROM scores WHERE city_id = ?", [city_id]);

		// 2. Masukkan nilai baru
		const query = "INSERT INTO scores (city_id, criteria_id, value) VALUES ?";
		const values = scores.map((item) => [
			city_id,
			item.criteria_id,
			item.value,
		]);

		await connection.query(query, [values]);

		await connection.commit();
		res.json({ msg: "Penilaian berhasil disimpan!" });
	} catch (error) {
		await connection.rollback();
		res.status(500).json({ msg: error.message });
	} finally {
		connection.release();
	}
};
