import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../../components/utils/validation/Validation'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import { Button,Form } from 'react-bootstrap'
import './forgotPassword.css'
const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="fg_pass">
            <h2>Forgot Your Password?</h2>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="email" placeholder="Enter email" 
    name="email"
    required 
    value={email}
    onChange={handleChangeInput} 
    />
  </Form.Group>
  <Button onClick={forgotPassword}>Verify your email</Button>
  </Form>
        </div>
    )
}

export default ForgotPassword