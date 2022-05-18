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

export const fetchAllAdmin = async (token) => {
    const res = await axios.get('/user/allAdmin', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchUserById = async (id) => {
    const res = await axios.get(`/user/user/${id}`)
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

export const dispatchGetAllAdmin= (res) => {
    return {
        type: ACTIONS.GET_ALL_ADMIN,
        payload: res.data
    }
}

export const dispatchGetAllUserById= (res) => {
    return {
        type: ACTIONS.GET_USER_BY_ID,
        payload: res.data
    }
}
