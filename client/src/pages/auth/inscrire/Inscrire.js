import React, {useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import axios from 'axios'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import './inscrire.css'
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
            navigate("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    

    return (
      <div >
      {err && ShowErrMsg(err)}
            {success && ShowSuccessMsg(success)}
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label className="labelForm" >Nom complet</Form.Label>
        <Form.Control type="Normal text"
         placeholder="Saisissez votre mot de passe" 
         name="name"
         value={name}
         onChange={handleChangeInput} 
        required 
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="labelForm">Adresse e-mail</Form.Label>
        <Form.Control type="email" placeholder="nom@gmail.com"
        name="email"
        required 
        value={email}
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label className="labelForm" >Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Créez votre mot de pase" 
         name="password"
        required 
        value={password}
        onChange={handleChangeInput} 
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button  className='btn-inscr'  type="submit" size="lg" >
        S'inscrire
      </Button>
       <Form.Label>Vous avez déjà un compte ?
       <a href="/connexion" className="link">Se connecter</a> 
       </Form.Label>
   </div>
      </Form>
      </div>
      )
}

export default Inscrire;