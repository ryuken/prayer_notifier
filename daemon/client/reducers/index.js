import { combineReducers } from 'redux'

import {prayers, nextPrayer} from './prayers'
import config from './config'

const rootReducer = combineReducers({
    prayers,
    nextPrayer,
    config,
})

export default rootReducer
