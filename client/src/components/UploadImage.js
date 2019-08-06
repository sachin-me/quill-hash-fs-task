import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgActions from '../actions/image.action';

class UploadImage extends Component {

	state = {
		image: null
	}

	handleFile = (event) => {
		const photo = event.target.files[0];
    this.setState({
			image: photo
		})
    console.log(photo, 'photo')
		// file conversion to base64 using FileReader fn
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   sendImg(event.target.result);
    // };
		// reader.readAsDataURL(photo);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { image } = this.state;
		// const data = { image }
		this.props.dispatch(imgActions.uploadImage(image))
	}

	render() {
		return (
			<div>
				<form action="" method="post" encType='multipart/form-data' onSubmit={this.handleSubmit}>
					<input type="file" name="image" id="" onChange={this.handleFile} />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default connect(null)(UploadImage);