const defaultState = {
	uid: undefined
}

const reducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'LOGIN':
			return {
				uid: action.uid
			}
		case 'LOGOUT':
			return {}
		default:
			return state
	}
}

export default reducer