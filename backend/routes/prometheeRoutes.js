const express = require('express');
const router = express.Router();
const prometheeController = require('../controllers/prometheeController');

// Route POST (User kirim ID kota -> Dapat Hasil)
// Tidak pakai verifyToken agar User Public bisa akses
router.post('/analyze', prometheeController.analyze);

module.exports = router;