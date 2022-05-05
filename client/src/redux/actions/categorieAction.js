import ACTIONS from './index'
import axios from 'axios'

export const fetchCategories = async (token) => {
    const res = await axios.get('/allCategorie', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchCategories = (res) => {
    return {
        type: ACTIONS.GET_ALL_CATEGORIE,
        payload:  res.data
    }
}
