export default (state = {}, action) => {

	switch (action.type) {
		case "RECEIVE_CONFIG":
			return {...action.msg}
		default:
			return state
	}
}
