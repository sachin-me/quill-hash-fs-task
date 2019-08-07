import React, { Component } from 'react';

class Like extends Component {

	handleClick = () => {
		this.props.dispatch();
	}

	render() {
		return (
			<div onClick={this.handleClick}>
				<i className="fas fa-thumbs-up"></i>
			</div>
		);
	}
}

export default Like;