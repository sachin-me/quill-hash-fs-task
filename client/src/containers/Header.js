import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './Main';
import Upload from './Upload';

const Header = (props) => {
	const { isAuthenticated } = props;
	return (
		<>
			<div>
			<Link to='/'>
				<i className="fas fa-home"></i>
			</Link>
			</div>
			<div>
				{
					isAuthenticated ? (
						<Upload />
					) : (
						<Main />
					)
				}
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.userReducer.isAuthenticated
	}
}

export default connect(mapStateToProps)(Header);