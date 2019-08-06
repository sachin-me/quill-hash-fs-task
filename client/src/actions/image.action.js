import keys from "../key";

const imgActions = {

	// making request to server with image url which I am getting from cloudinary
	uploadImage: (data) => dispatch => {
		console.log(data, 'image');
		fetch('/image/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({image: data})
		})
		.then(res => res.json())
		.then(image => console.log(image, 'image'))
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
				console.log(image, 'image in image action')
				cb(true, image)
			} else {
				cb(false, image)
			}
		})
	}
}

export default imgActions