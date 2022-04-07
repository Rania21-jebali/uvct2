import React, {useState} from 'react'
import { Button,Form,Nav} from 'react-bootstrap';
import axios from 'axios'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Inscrire() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
  
    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    

    return (
      <div>
      {err && ShowErrMsg(err)}
            {success && ShowSuccessMsg(success)}
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Control type="Normal text"
         placeholder="Prénon et nom" 
         name="name"
         value={name}
         onChange={handleChangeInput} 
        required 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email"
        name="email"
        required 
        value={email}
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" 
         name="password"
        required 
        value={password}
        onChange={handleChangeInput} 
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button  style={{backgroundColor:"rgb(55, 8, 99)",color:"white",borderColor:"rgb(55, 8, 99)"}} 
      type="submit" size="lg"
     >
        S'inscrire
      </Button>
       <Form.Label>Vous avez déjà un compte ?
       <Nav.Link href="#home" >Se connecter</Nav.Link> 
       </Form.Label>
   </div>
      </Form>
      </div>
      )
}

export default Inscrire;