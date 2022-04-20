import ACTIONS from './index'
import axios from 'axios'

export const fetchMyEvents = async (token) => {
    const res = await axios.get('/myEvents', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyEvents = (res) => {
    return {
        type: ACTIONS.GET_MY_EVENTS,
        payload: res.data
    }
}

