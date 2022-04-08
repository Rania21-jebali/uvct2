import React, {useState} from 'react';
import { Button,Form,Nav} from 'react-bootstrap';
import { FaFacebook } from 'react-icons/fa';
import './Connexion.css';
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Connexion({userError,userSuccess}) {
    const [user, setUser] = useState(initialState)
    const {email, password, err, success} = user
    const dispatch = useDispatch()
    const history = useNavigate()
    
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
            history.push("/profil")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    const responseGoogle = async (response) => {
      try {
          const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

          setUser({...user, error:'', success: res.data.msg})
          localStorage.setItem('firstLogin', true)

          dispatch(dispatchLogin())
          history.push('/')
      } catch (err) {
          err.response.data.msg && 
          setUser({...user, err: err.response.data.msg, success: ''})
      }
  }
  const responseFacebook = async (response) => {
    try {
        const {accessToken, userID} = response
        const res = await axios.post('/user/facebook_login', {accessToken, userID})

        setUser({...user, error:'', success: res.data.msg})
        localStorage.setItem('firstLogin', true)

        dispatch(dispatchLogin())
        history.push('/')
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
  <Button  className="btn-conx" type="submit" size="lg" >
    Se connecter
  </Button>
  <Link to='/forgot_password'>Mot de passe oublié</Link>
  <Form.Label style={{textAlign:"center"}}>ou</Form.Label>
  <GoogleLogin
                    clientId="516635230406-k020fmfu8b5vrfbvck0atkm7sm7ifh3j.apps.googleusercontent.com"
                    buttonText="Continuer avec Google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
  <FacebookLogin
                appId="5341302392569355"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
  <Form.Label>Vous n'avez pas de compte ?
  <Nav.Link href="/inscrire">S'inscrire</Nav.Link> 
 </Form.Label>
  </div>
  </Form>
  </div>
  )
}

export default Connexion;
