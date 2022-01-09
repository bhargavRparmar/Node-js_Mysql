const express = require('express');
const router = express();
const upload = require('../Middleware/multer');
const portfolioController = require('../controller/portfolioController');
const { authenticate, generateToken } = require('../Middleware/auth');

router.post('/addPortfolio', authenticate, upload.array('projectImage', 5), portfolioController.addPortfolio);

router.get('/viewPortfolio', authenticate, portfolioController.viewPortfolio);

router.put('/updatePortfolio/:id', authenticate, upload.array('projectImage', 5), portfolioController.updatePortfolio);

router.get('/deletePortfolio/:id', authenticate, portfolioController.deletePortfolio);

router.get('/deleteAllPortfolio', authenticate, portfolioController.deleteAllPortfolio);

router.get('/multiDeletePortfolio', authenticate, portfolioController.multiDeletePortfolio);

module.exports = router;