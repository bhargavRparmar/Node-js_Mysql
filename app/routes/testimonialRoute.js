const express = require('express');
const router = express();
const testimonialController = require('../controller/testimonialController');
const upload = require('../Middleware/multer');
const { authenticate, generateToken } = require('../Middleware/auth');


router.post("/addTestimonial", authenticate, upload.single('Image'), testimonialController.addTestimonial);

router.get("/viewTestimonial", authenticate, testimonialController.viewTestimonial);

router.put("/updateTestimonial/:id", authenticate, upload.single('Image'), testimonialController.updateTestimonial);

router.get("/deleteTestimonial/:id", authenticate, testimonialController.deleteTestimonial);

router.get("/deleteAllTestimonial", authenticate, testimonialController.deleteAllTestimonial);


router.get('/multiDeleteTestimonial', authenticate, portfolioController.multiDeleteTestimonial);


module.exports = router;