// File: backend/controllers/authController.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// KUNCI RAHASIA (Nanti idealnya taruh di .env)
const JWT_SECRET = 'kunci_rahasia_negara_api_spk'; 

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cek apakah user ada di DB
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (users.length === 0) {
            return res.status(401).json({ msg: "Username tidak ditemukan!" });
        }

        const user = users[0];

        // 2. Cek Password (Bandingkan inputan dengan hash di DB)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password salah!" });
        }

        // 3. Buat Token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        // 4. Kirim Respon Sukses
        res.json({
            status: "success",
            msg: "Login berhasil!",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, username, email, role FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update Profile (Self)
exports.updateProfile = async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user.id; // Dari token

    try {
        let query = "UPDATE users SET username=?, email=? WHERE id=?";
        let params = [username, email, userId];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = "UPDATE users SET username=?, email=?, password=? WHERE id=?";
            params = [username, email, hashedPassword, userId];
        }

        await db.query(query, params);
        res.json({ msg: "Profil berhasil diupdate!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Tambah Admin Baru
exports.createAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')", 
        [username, email, hashedPassword]);
        res.json({ msg: "Admin baru berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Hapus Admin
exports.deleteAdmin = async (req, res) => {
    if (req.params.id == req.user.id) return res.status(400).json({msg: "Tidak bisa hapus diri sendiri"});
    await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({msg: "Admin dihapus"});
};