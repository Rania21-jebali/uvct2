import ACTIONS from './index'
import axios from 'axios'

export const fetchMyFormations = async (token) => {
    const res = await axios.get('/myFormations', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyFormations = (res) => {
    return {
        type: ACTIONS.GET_MY_FORMATIONS,
        payload: res.data
    }
}

