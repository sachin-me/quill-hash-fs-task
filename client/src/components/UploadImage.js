import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgActions from '../actions/image.action';
import keys from '../key';

class UploadImage extends Component {

	state = {
		image: null,
		message: ''
	}

	handleFile = (event) => {
		const photo = event.target.files[0];
    const sendImg = (str) => {
      str ? this.setState({ image: str }) : null;
    }

    // file conversion to base64 using FileReader fn
    const reader = new FileReader();
    reader.onload = (event) => {
      sendImg(event.target.result);
    };
    reader.readAsDataURL(photo);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { image } = this.state;
		const cloudData = { file: image, upload_preset: keys.UPLOAD_PRESET }
		
		this.props.dispatch(imgActions.cloudinaryImgUpload(cloudData, ((success, img) => {
			if (success) {
				this.props.dispatch(imgActions.uploadImage(img.secure_url, (done) => {
					if (done) {
						this.props.history.push('/');
					}
				}))
			} else {
				this.setState({
					message: img.error
				})
			}
		})))
	}

	render() {
		return (
			<div className="signup-wrapper">
				<form action="" method="post" encType='multipart/form-data' onSubmit={this.handleSubmit}>
					<input type="file" name="image" id="" onChange={this.handleFile} />
					<div className='signup-btn-wrapper'>
						<input type="submit" value="Submit" />
					</div>
				</form>
				<div className="message">{this.state.message}</div>
			</div>
		);
	}
}

export default connect(null)(UploadImage);