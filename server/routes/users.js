var express = require('express');
var router = express.Router();

var userController = require('./../controllers/userController');
const isLoggedIn = require('./../controllers/authController');
let { isLogged } = isLoggedIn;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user route
router.post('/register', userController.register)

// user login route
router.post('/login', userController.login)

// verifying user route
router.get('/verify', userController.verifyUser);

module.exports = router;
