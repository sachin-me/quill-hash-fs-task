// const uri = 'http://localhost:8000'

const actions = {
  createUser: (data, cb) => dispatch => {
    fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => {
			if (user.msg) cb(true)
			else cb(false)
		})
  },

  loginUser: (data, cb) => dispatch => {
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => {
			if (user.msg) {
				localStorage.setItem('token', user.token);
				localStorage.setItem('user', JSON.stringify(user));

				dispatch({
					type: 'USER_LOGIN_SUCCESS',
					user
				})
				cb(true)
			} else cb(false)
		})
	},
	
	verifyUser: (cb) => dispatch => {
		fetch('/users/verify', {
			headers: {
				'Content-Type': 'application/json',
				"authorization": localStorage.token
			}
		})
		.then(res => res.json())
		.then(user => {
			if (user.msg) {
				cb(true, user.msg)
			} else {
				cb(false, user.err)
			}
		})
	}
}

export default actions;