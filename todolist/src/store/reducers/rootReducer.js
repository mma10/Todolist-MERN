import taskReducer from './taskReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    error: errorReducer
})

export default rootReducer;