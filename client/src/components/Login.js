import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../actions/user.action';

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = ({target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.loginUser(this.state, (success) => {
			if (success) {
				this.props.history.push('/');
			}
		}))
  }

  render() {
    return (
			<div className="signup-wrapper">
				<form onSubmit={this.handleSubmit}>
					<input type="email" name="email" placeholder="email" onChange={this.handleChange} />
					<input type="password" name="password" placeholder="password" onChange={this.handleChange} />
					<div className='signup-btn-wrapper'>
						<input type="submit" value="Login" />
					</div>
					<div className='signup-info'>
						Need an account? <Link to='/register'>Signup</Link>
					</div>
				</form>
			</div>
    )
  }
}

export default connect(null)(Login);