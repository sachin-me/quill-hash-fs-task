import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgActions from '../actions/image.action';

class Like extends Component {

	handleClick = () => {
		this.props.dispatch(imgActions.likeImage());
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