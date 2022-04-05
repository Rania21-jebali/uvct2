import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button ,Form} from 'react-bootstrap'
import './RestPassword.css'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (
        <div className="rest_pass">
            <h2>Reset Your Password</h2>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="password" placeholder="Enter password" 
    name="password"
    required 
    value={password}
    onChange={handleChangeInput}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Confirm password" 
    name="cf_password"
    required 
    value={cf_password}
    onChange={handleChangeInput} 
   />
  </Form.Group>
  <Button  onChange={handleResetPass}>Reset Password</Button>
  </Form>
               
        </div>
    )
}

export default ResetPassword