const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// GET /api/carousel
router.get('/', carouselController.getCarouselItems);

// GET /api/carousel/health
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Health check passed' });
});

module.exports = router;
