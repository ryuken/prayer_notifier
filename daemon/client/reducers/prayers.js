export const prayers = (state = {}, action) => {
	switch (action.type) {
		case "RECEIVE_PRAYERS":
			return {...action.msg}
		default:
			return state
	}
}

export const nextPrayer = (state = null, action) => {
	switch (action.type) {
		case "RECEIVE_NEXT_PRAYER":
            if("undefined" !== typeof action.msg.prayer)
		         return action.msg.prayer
		default:
			return state
	}
}
