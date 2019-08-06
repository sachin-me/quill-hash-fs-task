const User = require('./../models/User');

module.exports = {
	uploadImage: (req, res) => {
		const { image } = req.body;
		console.log(image, 'in image ctrl');
		const { id } = res.locals.userId;
		console.log(id, 'checking userId');
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
			console.log(user, 'user');
			return res.status(200).json({
				msg: 'User updated',
				user
			})
		})
	}
}