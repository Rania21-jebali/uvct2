import ACTIONS from '../actions/'


  const  lecons = [];
   

  const leconReducer = (state = lecons, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_LECON:
            return action.payload
        default:
            return state
    }
}


export default leconReducer