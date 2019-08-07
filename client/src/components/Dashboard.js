import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import imgActions from '../actions/image.action';
import Like from './Like';
import SuperLike from './SuperLike';
import Block from './Block';

class Dashboard extends Component {

	componentDidMount() {
		this.props.dispatch(imgActions.getImage());
	}
	
	render() {
		const { image } = this.props;
		console.log(image, 'in dashboard');
		return (
			<div className="image-wrapper">
				<img src={image} alt=""/>
				<div className="image-action-wrapper">
					<Like />
					<SuperLike />
					<Block />
				</div>
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