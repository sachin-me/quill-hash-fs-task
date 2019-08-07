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
	},

	// Like an image
	likeImage: (req, res) => {
		const { id } = res.locals.userId;

		User.findOne({ _id: id }, (err, user) => {
			if (err) {
				return res.status(401).json({
					err: 'Bad request'
				})
			}

			// Checking if user already liked this user or not
			if (user.likes.indexOf(id) > -1) {
				User.findOneAndUpdate({ _id: id }, {
					$pull: {
						likes: id
					}
				}, (err, updatedUser) => {
					if (err) {
						return res.status(500).json({
							err: 'Internal server error'
						})
					} else {
						return res.status(200).json({
							msg: 'user already liked this image',
							updatedUser
						})
					}
				})
			} else {
				User.findOneAndUpdate({ _id: id }, {
					$push: {
						likes: id
					}
				}, (err, likedUser) => {
					if (err) {
						return res.status(500).json({
							err: 'Internal server error'
						})
					} else {
						return res.status(200).json({
							msg: 'user liked, success',
							likedUser
						})
					}
				})
			}
		})
	},

	// Superlike an image
	superlikeImage: (req, res) => {
		const { id } = res.locals.userId;

		User.findOne({ _id: id }, (err, user) => {
			if (err) {
				return res.status(401).json({
					err: 'Bad request'
				})
			}

			// Checking if user already superliked this user or not
			if (user.likes.indexOf(id) > -1) {
				User.findOneAndUpdate({ _id: id }, {
					$pull: {
						superlikes: id
					}
				}, (err, updatedUser) => {
					if (err) {
						return res.status(500).json({
							err: 'Internal server error'
						})
					} else {
						return res.status(200).json({
							msg: 'user already super liked',
							updatedUser
						})
					}
				})
			} else {
				User.findOneAndUpdate({ _id: id }, {
					$push: {
						superlikes: id
					}
				}, (err, superLikedUser) => {
					if (err) {
						return res.status(500).json({
							err: 'Internal server error'
						})
					} else {
						return res.status(200).json({
							msg: 'user super liked, success',
							superLikedUser
						})
					}
				})
			}
		})
	}
}