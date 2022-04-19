import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../../redux/actions/usersAction'
import { Button, Form } from 'react-bootstrap'
import '../Parametres.css'

const initialState = {
  nomCompte: '',
  numCompte:'',
  typeCompte:'',
  paysCompte:'',
  err: '',
  success: ''
}
function Paiement() {
  const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {nomCompte,numCompte,typeCompte,paysCompte, err, success} = data
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
    const updateInfor = () => {
      try {
          axios.patch('/user/updatePaiement', {
              nomCompte: nomCompte ? nomCompte : user.nomCompte,
              numCompte: numCompte ? numCompte : user.numCompte,
              typeCompte: typeCompte ? typeCompte : user.typeCompte,
              paysCompte: paysCompte ? paysCompte : user.paysCompte,
          },
          {
              headers: {Authorization: token}
          })

          setData({...data, err: '' , success: "Updated paiement Success!"})
      } catch (err) {
          setData({...data, err: err.response.data.msg , success: ''})
      }
  }

  
  const handleUpdate = () => {
       updateInfor()
  }
  return (
    <div className='paiement'>
    {err && ShowErrMsg(err)}
    {success && ShowSuccessMsg(success)}
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="label">Type de compte</Form.Label>
    <Form.Select 
    required 
    defaultValue={user.typeCompte}
    onChange={handleChange}>
    <option>Compte bancaire</option>
  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="label">Pays de compte bancaire</Form.Label>
    <Form.Select 
    required 
    defaultValue={user.paysCompte}
    onChange={handleChange}>
    <option>Tunisie</option>
  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Nom du compte</Form.Label>
    <Form.Control type="text" placeholder="Entrer le nom de votre carte" 
      required 
    defaultValue={user.nomCompte}
    onChange={handleChange}
    />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Numéro de carte</Form.Label>
    <Form.Control type="number" placeholder="Entrer votre numéro de carte" 
      required 
    defaultValue={user.numCompte}
    onChange={handleChange}
    />
  </Form.Group>
  <div className="content-button">
  <Button className='btn-confirme' onClick={handleUpdate}>Confirmer</Button>
  </div>
    </Form>
    </div>
  )
}

export default Paiement