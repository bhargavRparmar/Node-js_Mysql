const express = require('express');
const router = express();
const authController = require('../controller/authController');
const upload = require('../Middleware/multer');
const { authenticate, generateToken } = require('../Middleware/auth');


router.post("/login", generateToken, authController.login);

router.post("/registration", upload.single('Image'), authController.registration);


router.post("/verifyEmail", authController.verifyEmail);

router.post("/verifyOtp", authController.verifyOtp);

router.put("/updatePassword", authController.updatePassword);

router.get("/viewProfile", authenticate, authController.viewProfile);

router.put("/forgetPassword", authenticate, authController.forgetPassword);

router.get("/logout", authController.logout);

router.put("/updateProfile", authenticate, upload.single('Image'), authController.updateProfile);


module.exports = router;