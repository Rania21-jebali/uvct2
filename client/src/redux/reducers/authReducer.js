import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
    isInstr: false,
    isSuperAdmin: false,

}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                isInstr: action.payload.isInstr,
                isSuperAdmin: action.payload.isSuperAdmin,
            }
        default:
            return state
    }
}

export default authReducer