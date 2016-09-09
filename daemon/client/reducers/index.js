import { combineReducers } from 'redux'

import prayers from './prayers'
import config from './config'

const rootReducer = combineReducers({
    prayers,
    config,
})

export default rootReducer
