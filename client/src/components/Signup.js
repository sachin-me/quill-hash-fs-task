import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../actions/user.action';

class Signup extends Component {

  state = {
    username: '',
    email: '',
		password: '',
		message: ''
  }

  handleChange = ({target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { username, email, password } = this.state;
		const data = { username, email, password };
		if (!username && !email && !password) {
			return this.setState({
				message: 'Input your credentials :)'
			})
		}
    this.props.dispatch(actions.createUser(data, (success) => {
			if (success) {
				this.props.history.push('/login');
			} else {
				this.setState({
					message: 'Internal server error'
				})
			}
		}))
  }

  render() {
    return (
			<div className="signup-wrapper">
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" onChange={this.handleChange} />
					<input type="email" name="email" placeholder="email" onChange={this.handleChange} />
					<input type="password" name="password" placeholder="password" onChange={this.handleChange} />
					<div className='signup-btn-wrapper'>
						<input type="submit" value="Signup" />
					</div>
					<div className='signup-info'>
						Already an account? <Link to='/login'>Login</Link>
					</div>
					<div className="message">{this.state.message}</div>
				</form>
			</div>
    )
  }
}

export default connect(null)(Signup);