import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgActions from '../actions/image.action';

class SuperLike extends Component {

	handleChange = () => {
		this.props.dispatch(imgActions.superLikeImage())
	}

	render() {
		return (
			<div onClick={this.handleChange}>
				<i className="fas fa-heart"></i>
			</div>
		);
	}
}

export default connect(null)(SuperLike);