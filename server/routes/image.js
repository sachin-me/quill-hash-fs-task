const express = require('express');
const router = express.Router();
const imageController = require('./../controllers/image.controller');
const multerUploads = require('./../middlewares/multer');
const isUser = require('./../controllers/authController').isLogged;

router.post('/upload', multerUploads, isUser, imageController.uploadImage)

module.exports = router