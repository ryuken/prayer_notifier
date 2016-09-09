export default (state = {}, action) => {

	switch (action.type) {
		case "RECEIVE_PRAYERS":
			return {...action.msg}
		default:
			return state
	}
}
