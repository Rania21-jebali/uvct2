import ACTIONS from './index'
import axios from 'axios'

export const fetchSousCategorie = async (token,id) => {
    const res = await axios.get(`/allSousCategorie/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchSousCategorie = (res) => {
    return {
        type: ACTIONS.GET_ALL_SOUS_CATEGORIE,
        payload:  res.data
    }
}
