const express = require('express');
const router = express.Router();

// Controllers
const {createImage, removeImage} = require('../controllers/cloudinary')

// Midleware
const {auth, adminCheck} = require('../middleware/auth')

//@Enpoint : http://localhost:9000/api/images

router.post('/images',auth, adminCheck, createImage)

router.post('/removeimages',auth, adminCheck, removeImage)

module.exports = router