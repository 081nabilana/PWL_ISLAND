// File: backend/routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const verifyToken = require('../middleware/authMiddleware'); // Satpam Login
const { validateCity } = require('../middleware/validate');  // Pengecek Input

// Public (Bisa diakses siapa saja)
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);

// Protected (Hanya Admin yang punya Token)
router.post('/', verifyToken, validateCity, cityController.createCity);
router.put('/:id', verifyToken, validateCity, cityController.updateCity);
router.delete('/:id', verifyToken, cityController.deleteCity);

module.exports = router;