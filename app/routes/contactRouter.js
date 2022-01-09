const express = require('express');
const router = express();
const contactController = require('../controller/contactController');
const { authenticate, generateToken } = require('../Middleware/auth');

router.post("/addContact", authenticate, contactController.addContact);

router.get("/viewContact", authenticate, contactController.viewContact);

router.put("/updateContact/:id", authenticate, contactController.updateContact);

router.get("/deleteContact/:id", authenticate, contactController.deleteContact);

router.get('/deleteAllContact', authenticate, contactController.deleteAllContact);

router.get("/multiDeleteContact", authenticate, contactController.multiDeleteContact);



module.exports = router;