import React, { Component } from 'react';
import { connect } from 'react-redux';
import Protected from './Protected';
import Public from './Public';

class App extends Component {
	
	componentDidMount() {
		
	}
	
	render() {
		const { isAuthenticated } = this.props;
		return (
			<div>
				{
					isAuthenticated ? <Protected /> : <Public />
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.userReducer.isAuthenticated
	}
}

export default connect(mapStateToProps)(App);