const initState = {
	image: ''
}

export default function imgReducer(state = initState, action) {
	switch (action.type) {
		case 'GET_IMAGE_SUCCESS': {
			return {
				...state,
				image: action.image
			}
		}
				
		default:
			return state;
	}
}