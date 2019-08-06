import React, { Component } from 'react';
import { connect } from 'react-redux';
import Protected from './Protected';
import Public from './Public';
import actions from '../actions/user.action';

class App extends Component {
	
	state = {
		message: '',
		error: ''
	}

	componentDidMount() {
		const { isAuthenticated } = this.props;
		if (isAuthenticated) {
			this.props.dispatch(actions.verifyUser((success, message) => {
				if (success) {
					this.setState({
						message: message
					})
				} else {
					this.setState({
						error: message
					})
				}
			}));
		}
	}
	
	render() {
		const { isAuthenticated } = this.props;
		const { message, error } = this.state;
		return (
			<div>
				{
					isAuthenticated ? <Protected /> : <Public />
				}
				<p>
					{
						message ? message : error
					}
				</p>
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