// File: backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kunci_rahasia_negara_api_spk'; // Harus sama dengan authController

module.exports = (req, res, next) => {
    // 1. Ambil token dari Header (Authorization: Bearer <token>)
    const token = req.header('Authorization');

    // 2. Kalau gak ada token, tolak!
    if (!token) {
        return res.status(401).json({ msg: 'Akses ditolak! Token tidak ditemukan.' });
    }

    try {
        // 3. Verifikasi Token
        // Biasa token dikirim format "Bearer <token>", kita ambil <token>-nya aja
        const tokenClean = token.replace('Bearer ', '');
        
        const decoded = jwt.verify(tokenClean, JWT_SECRET);

        // 4. Simpan data user yang login ke dalam request (req.user)
        req.user = decoded;
        
        // 5. Lanjut ke controller berikutnya
        next(); 
    } catch (error) {
        res.status(401).json({ msg: 'Token tidak valid!' });
    }
};