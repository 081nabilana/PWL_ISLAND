const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const verifyToken = require("../middleware/authMiddleware");

// Get semua nilai (untuk perhitungan)
router.get("/", scoreController.getAllScores);

// Get nilai berdasarkan ID Kota
router.get("/:cityId", verifyToken, scoreController.getScoresByCity);

// Simpan nilai (POST)
router.post("/", verifyToken, scoreController.saveScores);

module.exports = router;
