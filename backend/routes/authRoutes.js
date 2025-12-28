// File: backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); // Import middleware

router.post('/login', authController.login);
router.get('/admins', verifyToken, authController.getAllAdmins);     // <--- Baru
router.post('/admins', verifyToken, authController.createAdmin);     // <--- Baru
router.delete('/admins/:id', verifyToken, authController.deleteAdmin); // <--- Baru
router.put('/profile', verifyToken, authController.updateProfile);   // <--- Baru

module.exports = router;