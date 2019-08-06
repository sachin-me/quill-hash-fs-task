const jwt = require('jsonwebtoken');
const User = require('./../models/User');

module.exports = {
  isLogged: (req, res, next) => {
		const token = req.headers['authorization'];
		jwt.verify(token , process.env.secret, (err, decode) => {
			if (err) {
				return res.status(401).json({
					error: 'Send proper token'
				})
			} 
			res.locals.userId = decode
			next()
		})
  }
}