import ACTIONS from '../actions/'

  const  categorie = [];

  const categoriesReducer = (state = categorie, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_CATEGORIE:
            return action.payload
        default:
            return state
    }
}

export default categoriesReducer