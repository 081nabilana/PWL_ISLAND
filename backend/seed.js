// File: backend/seed.js
const db = require('./config/database');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        // 1. Cek apakah admin sudah ada
        const [rows] = await db.query("SELECT * FROM users WHERE username = 'admin'");
        if (rows.length > 0) {
            console.log('⚠️ Admin sudah ada, tidak perlu dibuat lagi.');
            process.exit();
        }

        // 2. Buat password terenkripsi
        const passwordAsli = 'admin123';
        const hashedPassword = await bcrypt.hash(passwordAsli, 10);

        // 3. Masukkan ke Database
        await db.query(
            "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
            ['admin', 'admin@example.com', hashedPassword, 'admin']
        );

        console.log('✅ Admin berhasil dibuat!');
        console.log('👤 Username: admin');
        console.log('🔑 Password: admin123');
        process.exit();
    } catch (error) {
        console.error('❌ Gagal seed:', error);
        process.exit(1);
    }
};

seedAdmin();