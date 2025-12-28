// File: backend/controllers/cityController.js
const db = require('../config/database');

// 1. LIHAT SEMUA KOTA (GET)
exports.getAllCities = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cities ORDER BY name ASC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// 2. LIHAT SATU KOTA (GET by ID)
exports.getCityById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cities WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ msg: "Kota tidak ditemukan" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// 3. TAMBAH KOTA (POST) - Khusus Admin
exports.createCity = async (req, res) => {
    const { name, num_coworking, last_updated, image_url } = req.body;
    try {
        await db.query(
            "INSERT INTO cities (name, num_coworking, last_updated, image_url) VALUES (?, ?, ?, ?)",
            [name, num_coworking, last_updated, image_url || '']
        );
        res.status(201).json({ msg: "Kota berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// 4. EDIT KOTA (PUT) - Khusus Admin
exports.updateCity = async (req, res) => {
    const { name, num_coworking, last_updated, image_url } = req.body;
    try {
        await db.query(
            "UPDATE cities SET name=?, num_coworking=?, last_updated=?, image_url=? WHERE id=?",
            [name, num_coworking, last_updated, image_url || '', req.params.id]
        );
        res.json({ msg: "Kota berhasil diupdate!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// 5. HAPUS KOTA (DELETE) - Khusus Admin
exports.deleteCity = async (req, res) => {
    try {
        await db.query("DELETE FROM cities WHERE id = ?", [req.params.id]);
        res.json({ msg: "Kota berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};