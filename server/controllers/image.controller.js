const User = require('./../models/User');
const Notification = require('./../models/Notification');

var a = ''
module.exports.test = function (io) {
	a = io
	return {
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
		likeImage: (req, res, next) => {
			const { id } = res.locals.userId;
			const { value } = req.body;

			User.findOne({ _id: id }, (err, user) => {
				if (err) {
					return res.status(401).json({
						err: 'Bad request'
					})
				}
				// Checking if user already liked this user or not

				if (user.likes.includes(id)) {
					User.findOneAndUpdate({ _id: id }, {
						$pull: {
							'likes': user._id
						}
					}, {new: true}, (err, updatedUser) => {
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
							'likes': user._id
						}
					}, {new: true}, (err, likedUser) => {
						if (err) {
							return res.status(500).json({
								err: 'Internal server error'
							})
						} else {
							const newNotification = new Notification({
								liker: user._id,
								likee: likedUser._id,
								status: value
							})
							newNotification.save((err, notification) => {
								if (err) {
									return res.status(500).json({
										err: 'Failed to create notification'
									})
								} else {
									User.findOneAndUpdate({ _id: id}, {
										$push: {
											notifications: notification._id
										}
									}, {new: true}, (err, likeduser) => {
										if (err) {
											return res.status(500).json({
												err: 'Internal server error'
											})
										}
										return res.status(200).json({
											msg: 'update user, success',
											likeduser
										})
									})
								}
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
				if (user.superlikes.includes(id)) {
					User.findOneAndUpdate({ _id: id }, {
						$pull: {
							'superlikes': user._id
						}
					}, {new: true}, (err, updatedUser) => {
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
							'superlikes': user._id
						}
					}, {new: true}, (err, superLikedUser) => {
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
		},

		// Block an image/user
		blockImage: (req, res) => {
			const { id } = res.locals.userId;

			User.findOne({ _id: id }, (err, user) => {
				if (err) {
					return res.status(401).json({
						err: 'Bad request'
					})
				}

				// Checking if user already superliked this user or not
				if (user.blocks.includes(id)) {
					User.findOneAndUpdate({ _id: id }, {
						$pull: {
							'blocks': user._id
						}
					}, {new: true}, (err, updatedUser) => {
						if (err) {
							return res.status(500).json({
								err: 'Internal server error'
							})
						} else {
							return res.status(200).json({
								msg: 'user already blocked',
								updatedUser
							})
						}
					})
				} else {
					User.findOneAndUpdate({ _id: id }, {
						$push: {
							'blocks': user._id
						}
					}, {new: true}, (err, blockedUser) => {
						if (err) {
							return res.status(500).json({
								err: 'Internal server error'
							})
						} else {
							return res.status(200).json({
								msg: 'user blocked, success',
								blockedUser
							})
						}
					})
				}
			})
		},

		// get notifications for like 
		getLikeNotifications: (req, res) => {
			const { id } = res.locals.userId;
			User.findOne({_id: id}).populate('notifications').exec((err, notifications) => {
				if (err) {
					return res.status(500).json({
						err: 'Internal server error'
					})
				} else {
						Notification.findOne({ _id: notifications.notifications[0]._id }).populate('liker').exec((err, singleNtfs) => {
							if (err) {
								return res.status(500).json({
									err: 'Internal server error'
								})
							} else {
								if (singleNtfs.liker[0]) {
									const { email, username } = singleNtfs.liker[0];
									const info = { email, username };
									a.emit('likes', info);
									return res.status(200).json({
										msg: 'get notification, success',
										info
									})
								}

							}
						})
					// })
				}
			})
		}
	}
} 