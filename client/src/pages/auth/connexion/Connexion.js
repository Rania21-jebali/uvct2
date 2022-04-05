import React, {useState} from 'react';
import { Button,Form,Nav} from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import './Connexion.css';
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}



function Connexion({userError,userSuccess}) {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useNavigate()

    const {email, password, err, success} = user
    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

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
  <Button  className="button-connexion1" type="submit" size="lg" 
  style={{backgroundColor:"blueviolet" , color:"white",borderColor:"blueviolet"}}
  >
    Connexion
  </Button>
  <Link to='/forgot_password'>Mot de passe oublié</Link>
  <Form.Label style={{textAlign:"center"}}>ou</Form.Label>
  <Button  size="lg" className='button-connexion-m'>
  <FcGoogle size="1.5em"/>Continuer avec Google
  </Button>
  <Button  size="lg" className='button-connexion-m'>
  <FaFacebook size="1.5em" color="royalblue"/>  Continuer avec Facebook
  </Button>
  <Form.Label>Vous n'avez pas de compte ?
  <Nav.Link href="/" style={{color:"blueviolet"}}>S'inscrire</Nav.Link> 
 </Form.Label>
  </div>
  </Form>
  </div>
  )
}


export default Connexion;
