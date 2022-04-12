import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/user/all_infor', {
        headers: {Authorization: token}
    })
    return res
}
export const fetchAllCond = async (token) => {
    const res = await axios.get('/user/allCond', {
        headers: {Authorization: token}
    })
    return res
}
export const fetchAllInstr = async (token) => {
    const res = await axios.get('/user/allInstr', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}

export const dispatchGetAllCond= (res) => {
    return {
        type: ACTIONS.GET_ALL_COND,
        payload: res.data
    }
}
export const dispatchGetAllInstr= (res) => {
    return {
        type: ACTIONS.GET_ALL_INSTR,
        payload: res.data
    }
}