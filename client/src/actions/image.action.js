import keys from "../key";

const imgActions = {

	// making request to server with image url which I am getting from cloudinary
	uploadImage: (data, cb) => dispatch => {
		fetch('/image/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			},
			body: JSON.stringify({image: data})
		})
		.then(res => res.json())
		.then(image => {
			if (image.msg) {
				cb(true)
			} else {
				cb(false)
			}
		})
	},

	// Uploading image to cloudinary
	cloudinaryImgUpload: (data, cb) => dispatch => {
		fetch(keys.IMAGE_UPLOAD_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(image => {
			if (!image.error) {
				cb(true, image)
			} else {
				cb(false, image)
			}
		})
	},

	// getting image from db in this fn
	getImage: () => dispatch => {
		fetch('/image/getimage', {
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			}
		})
		.then(res => res.json())
		.then(image => {
			if (image.msg) {
				dispatch({
					type: 'GET_IMAGE_SUCCESS',
					image: image.image
				})
			}
		})
	},

	// Like an image
	likeImage: (value, cb) => dispatch => {
		console.log(value);
		fetch('/image/like', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			},
			body: JSON.stringify({ value })
		})
		.then(res => res.json())
		.then(data => {
			if (data.msg) {
				cb(true)
			} else {
				cb(false)
			}
		})
	},

	// superlike an image
	superLikeImage: () => dispatch => {
		fetch('/image/superlike', {
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			}
		})
		.then(res => res.json())
		.then(data => console.log(data, 'data in super like image'))
	},

	// Block an image/user
	blockImage: () => dispatch => {
		fetch('/image/block', {
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			}
		})
		.then(res => res.json())
		.then(blocked => console.log(blocked, 'blocked user in imgActions'))
	},

	// Get like notification
	getLikeNotification: (socket) => dispatch => {
		fetch('/image/likenotification', {
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.token
			}
		})
		.then(res => res.json())
		.then(notification => {
			console.log(socket, 'socket');
			socket.on('likes', (ntfs) => {
				console.log(ntfs, 'in image action');
			})
		})
	}
}

export default imgActions