import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {isLength, isMatch} from '../../../../components/utils/validation/Validation'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../../redux/actions/usersAction'
import { Button, Form } from 'react-bootstrap'
import '../Parametres.css'

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: ''
}
function MotdePasse() {
  const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const { isAdmin} = auth
    const [data, setData] = useState(initialState)
    const { password, cf_password, err, success} = data

    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {

        const {name, value} = e.target

        setData({...data, [name]:value, err:'', success: ''})
    }
    const updatePassword = () => {
      if(isLength(password))
          return setData({...data, err: "Password must be at least 6 characters.", success: ''})

      if(!isMatch(password, cf_password))
          return setData({...data, err: "Password did not match.", success: ''})

      try {
          axios.post('/user/reset', {password},{
              headers: {Authorization: token}
          })

          setData({...data, err: '' , success: "Updated Success!"})
      } catch (err) {
          setData({...data, err: err.response.data.msg , success: ''})
      }
  }

  const handleUpdate = () => {
      if(password) updatePassword()
  }
  return (
    <div className='motDePasse'>
     {err && ShowErrMsg(err)}
     {success && ShowSuccessMsg(success)}
    <Form>
    <Form.Group className="mb-3" >
    <Form.Label className="label">Mot de passe actuel</Form.Label>
  <Form.Control type="password" placeholder="Entrer le mot de passe actuel" 
    name="password"
    value={password}

    />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Nouveau mot de passe</Form.Label>
  <Form.Control type="password" placeholder="Entrer le nouveau mot de passe" 
  required
    name="password"
    value={password}
    onChange={handleChange}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label className="label">Répétez le nouveau mot de passe ici</Form.Label>
    <Form.Control type="password" placeholder="Confirmer le nouveau mot de passe" 
    required
    name="cf_password"
    value={cf_password}
    onChange={handleChange}
   />
  </Form.Group>
  <div className="content-button">
  <Button className='btn-confirme' onClick={handleUpdate}>Changer le mot de passe</Button>
  </div>
    </Form>
    </div>

  )
}

export default MotdePasse