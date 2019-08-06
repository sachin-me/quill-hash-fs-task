const imgActions = {
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
	}
}

export default imgActions