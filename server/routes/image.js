const express = require('express');
const router = express.Router();
const imageController = require('./../controllers/image.controller');
const multerUploads = require('./../middlewares/multer');
const isUser = require('./../controllers/authController').isLogged;
const imgCtrl = imageController.test()

// Uploading image to db from client at this route
router.post('/upload', multerUploads, isUser, imgCtrl.uploadImage)

// Getting image from db at this route
router.get('/getimage', isUser, imgCtrl.getImage);

// calling like user controller at this route
router.post('/like', isUser, imgCtrl.likeImage)

// calling superlike user controller at this route
router.get('/superlike', isUser, imgCtrl.superlikeImage);

// calling block image/user controller at this route
router.get('/block', isUser, imgCtrl.blockImage);

// calling like notifications at this route
router.get('/likenotification', isUser, imgCtrl.getLikeNotifications);

module.exports = router