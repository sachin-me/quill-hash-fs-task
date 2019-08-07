const express = require('express');
const router = express.Router();
const imageController = require('./../controllers/image.controller');
const multerUploads = require('./../middlewares/multer');
const isUser = require('./../controllers/authController').isLogged;

// Uploading image to db from client at this route
router.post('/upload', multerUploads, isUser, imageController.uploadImage)

// Getting image from db at this route
router.get('/getimage', isUser, imageController.getImage);

module.exports = router