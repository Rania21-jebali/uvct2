import ACTIONS from './index'
import axios from 'axios'

export const fetchSessions = async (token,id) => {
    const res = await axios.get(`/allSession/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchSessions = (res) => {
    return {
        type: ACTIONS.GET_ALL_SESSION,
        payload:  res.data
    }
}
