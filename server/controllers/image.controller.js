const User = require('./../models/User');

module.exports = {

	// uploading image to db
	uploadImage: (req, res) => {
		const { image } = req.body;
		const { id } = res.locals.userId;
		
		User.findOneAndUpdate({ _id: id }, {
			$set : {
				image: image
			}
		}, (err, user) => {
			if (err) {
				return res.status(500).json({
					err: 'Internal server error'
				})
			}
			return res.status(200).json({
				msg: 'User updated',
				user
			})
		})
	},

	// getting image from db
	getImage: (req, res) => {
		const { id } = res.locals.userId;
		User.findOne({ _id: id }, (err, user) => {
			if (err) {
				return res.status(500).json({
					err: 'unable to get image'
				})
			}
			return res.status(200).json({
				msg: 'Getting image, success',
				image: user.image
			})
		})
	}
}