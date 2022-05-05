import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import events from './eventsReducer'
import comptes from './compteReducer'
import formations from './formationsReducer'
import chapitres from './chapitreReducer'
import lecons from './leconReducer'
import categorie from './categorieReducer'
import sousCategorie from './sousCategorieReducer'




export default combineReducers({
    auth,
    token,
    users,
    events,
    comptes,
    formations,
    chapitres,
    lecons,
    categorie,
    sousCategorie
})