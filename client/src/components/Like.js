import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import imgActions from '../actions/image.action';

const socket = io();

class Like extends Component {

	state = {
		like: 'LIKE'
	}

	handleClick = () => {
		this.props.dispatch(imgActions.likeImage(this.state.like, (success) => {
			if (success) {
				this.props.dispatch(imgActions.getLikeNotification(socket));
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