import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgActions from '../actions/image.action';

class Like extends Component {

	state = {
		like: 'LIKE'
	}

	handleClick = () => {
		this.props.dispatch(imgActions.likeImage(this.state.like, (success) => {
			if (success) {
				this.props.dispatch(imgActions.getLikeNotification());
			}
		}));
	}

	render() {
		return (
			<div onClick={this.handleClick}>
				<i className="fas fa-thumbs-up"></i>
			</div>
		);
	}
}

export default connect(null)(Like);