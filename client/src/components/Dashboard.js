import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imgActions from '../actions/image.action';

class Dashboard extends Component {

	componentDidMount() {
		this.props.dispatch(imgActions.getImage());
	}
	
	render() {
		const { image } = this.props;
		console.log(image, 'in dashboard');
		return (
			<div>
				I am dashboard
				{/* <img src={image} alt=""/> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		image: state.imgReducer.image
	}
}

export default connect(mapStateToProps)(Dashboard);