import ACTIONS from './index'
import axios from 'axios'

export const fetchLecons = async (token,id) => {
    const res = await axios.get(`/allLecon/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchLecons = (res) => {
    return {
        type: ACTIONS.GET_ALL_LECON,
        payload:  res.data
    }
}
