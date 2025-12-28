const db = require('../config/database');

// GET Semua Kriteria
exports.getAllCriteria = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM criteria");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// TAMBAH Kriteria
exports.createCriteria = async (req, res) => {
    const { name, code, weight, type } = req.body;
    try {
        await db.query(
            "INSERT INTO criteria (name, code, weight, type) VALUES (?, ?, ?, ?)",
            [name, code, weight, type]
        );
        res.status(201).json({ msg: "Kriteria berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// HAPUS Kriteria
exports.deleteCriteria = async (req, res) => {
    try {
        await db.query("DELETE FROM criteria WHERE id = ?", [req.params.id]);
        res.json({ msg: "Kriteria berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};