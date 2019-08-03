var User = require('./../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

	// Creating new user
  register : (req, res) => {
    const {username, email, password} = req.body;
    const newUser = new User({
      username, email, password
    })
    newUser.save((err, user) => {
      if(err) return res.json({err: "Failed to create new user"})
      res.json({msg: 'User created', username: user.username, email: user.email })
    })
  },

  login: (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
      if(!user){
        return res.status(401).json({err: "User not found."})
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result){
          const id = user._id
          const token = jwt.sign({id}, process.env.secret);
          return res.status(200).json({msg: 'user logged in', name: user.username, email: user.email, token})
        }
        else {
          return res.status(401).json({err: "Invalid User"})
        }
      })
    })
	},
	
	verifyUser: (req, res) => {
		const token = req.headers["authorization"];
		if (!token) {
			return res.status(401).json({
			err: 'Unauthorized user'
		})}
		else {
			jwt.verify(token, process.env.secret, (error, decode) => {
				if (error) {
					return res.status(403).json({
						err: 'Send proper token'
					})
				}
				const id = decode.id;
				User.findOne({_id: id}, (err, user) => {
					if (err) {
						return res.status(500).json({
							err: 'Internal server error'
						})
					} else {
						return res.status(200).json({msg: 'user verified', name: user.username, email: user.email, token})
					}
				})
			})
		}
	}
}