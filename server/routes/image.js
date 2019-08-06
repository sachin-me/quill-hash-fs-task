const express = require('express');
const router = express.Router();
const imageController = require('./../controllers/image.controller');
const multerUploads = require('./../middlewares/multer');

router.post('/upload', multerUploads, imageController.uploadImage)

module.exports = router