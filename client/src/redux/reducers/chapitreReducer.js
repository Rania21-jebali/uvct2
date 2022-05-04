import ACTIONS from '../actions/'


  const  chapitres = [];
   

  const chapitresReducer = (state = chapitres, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_ChAP:
            return action.payload
        default:
            return state
    }
}


export default chapitresReducer