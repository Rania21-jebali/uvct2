import ACTIONS from './index'
import axios from 'axios'

export const fetchChapitres = async (token,id) => {
    const res = await axios.get(`/allChapitre/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchChapitres = (res) => {
    return {
        type: ACTIONS.GET_ALL_ChAP,
        payload:  res.data
    }
}
