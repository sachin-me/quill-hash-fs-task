import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/user.action';

class Signup extends Component {

  state = {
    username: '',
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
    this.props.dispatch(actions.createUser(this.state, (success) => {
			if (success) {
				this.props.history.push('/login');
			}
		}))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
        <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
        <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
        <input type="submit" value="Signup" />
      </form>
    )
  }
}

export default connect(null)(Signup);