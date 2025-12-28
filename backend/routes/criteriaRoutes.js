const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/criteriaController');
const verifyToken = require('../middleware/authMiddleware');

// Public (Bisa dilihat user umum nanti)
router.get('/', criteriaController.getAllCriteria);

// Protected (Cuma Admin)
router.post('/', verifyToken, criteriaController.createCriteria);
router.delete('/:id', verifyToken, criteriaController.deleteCriteria);

module.exports = router;