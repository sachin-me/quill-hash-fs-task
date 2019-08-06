const initState = {
	currentUser: JSON.parse(localStorage.getItem('user')) || null,
  currentToken: localStorage.getItem('token') || null,
	isAuthenticated: localStorage.getItem('token') ? true : false
}

function userReducer(state = initState, action) {
  switch (action.type) {
		
		case 'USER_LOGIN_SUCCESS': {
			return {
				...state,
				currentUser: action.user,
				currentToken: action.user.token,
				isAuthenticated: action.user.token ? true : false
			}
		}
		
    default:
      return state;
  }
}

export default userReducer;