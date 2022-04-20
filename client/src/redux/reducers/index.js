import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import events from './eventsReducer'



export default combineReducers({
    auth,
    token,
    users,
    events
   
})