import React, { Component } from 'react';
import imgActions from '../actions/image.action';
import { connect } from 'react-redux';

class Block extends Component {

	handleClick = () => {
		this.props.dispatch(imgActions.blockImage());
	}

	render() {
		return (
			<div onClick={this.handleClick}>
				<i className="fas fa-ban"></i>
			</div>
		);
	}
}

export default connect(null)(Block);