import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import {fetchMyCompte, dispatchGetMyCompte} from '../../../../redux/actions/compteAction'
import { Button, Form,Modal } from 'react-bootstrap'
import '../Parametres.css'
import { useNavigate } from 'react-router-dom'

const initialState = {
  nomCompte: '',
  numCompte:'',
  typeCompte:'',
  paysCompte:'',
  devise:'',
  err: '',
  success: ''
}
function Paiement() {
    const token = useSelector(state => state.token)
    const [compte, setCompte] = useState(initialState)
    const {nomCompte,numCompte,typeCompte,paysCompte,devise, err, success} = compte
    const comptes = useSelector(state => state.comptes)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [exist,setExist] = useState(false);
    const navigate = useNavigate();

            useEffect(() => {
                  fetchMyCompte(token).then(res =>{
                      dispatch(dispatchGetMyCompte(res))
                  })
            },[token, dispatch, callback])


            const handleChange = e => {
                const {name, value} = e.target
                setCompte({...compte, [name]:value, err:'', success: ''})
            }
            const handleSubmit = async e => {
              e.preventDefault()
              try {
                  const res = await axios.post('/addCompte', {
                    nomCompte,numCompte,typeCompte,paysCompte,devise
                  },{
                    headers: {Authorization: token}
                })
                  setCompte({...compte, err: '', success: res.data.msg})
                  setExist(true);
                  window.location.reload(false);
              } catch (err) {
                  err.response.data.msg && 
                  setCompte({...compte, err: err.response.data.msg, success: ''})
              }
          }
          const handleDelete = async (id) => {
            try {
                if(compte._id !== id){
                        await axios.delete(`/deleteCompte/${id}`, {
                            headers: {Authorization: token}
                        })
                        setCallback(!callback)
                        setExist(true);
                        navigate("/parametres")
                }
                
            } catch (err) {
                setCompte({...compte, err: err.response.data.msg , success: ''})
            }
        }

  return (
    <div className='paiement'>
            {exist ?
            (
              <>
              Pour retirer vos gains, vous avez besoin d'ajouter des comptes de retrait ici.<br />
        Vous devez avoir au moins un compte par devise pour retirer le revenu généré dans cette devise.<br />
        <Button className="btn-compte" onClick={handleShow}>Ajouter un compte</Button>
              </>
            ):
            (
              <>
              Votre compte:<br />
              <div className='affiche-compte'>
              {comptes.map(c => (
                    <>
                    <p>{c.nomCompte}</p>
                    <p>{c.devise}</p>
                    <p>{c.numCompte}</p>
                    <img src="images/trash.png" alt="" className='icon-action' 
                    onClick={() => handleDelete(c._id)}/> 
                    </>
              ))}
              </div>
              </>
            )
            }
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un compte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && ShowErrMsg(err)}
        {success && ShowSuccessMsg(success)}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="label">Devise de compte</Form.Label>
              <Form.Select 
              required 
              name="devise"
              value={devise}
              onChange={handleChange}>
              <option>TND</option>
              <option>EUR</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="label">Type de compte</Form.Label>
            <Form.Select 
            required 
            name="typeCompte"
            value={typeCompte}
            onChange={handleChange}>
            <option>Compte bancaire</option>
          </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="label">Pays de compte bancaire</Form.Label>
          <Form.Select 
          required 
          name="paysCompte"
          value={paysCompte}
          onChange={handleChange}>
          <option>Tunisie</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className="label">Nom du compte</Form.Label>
          <Form.Control type="text" placeholder="Entrer le nom de votre carte" 
            required 
            name="nomCompte"
          value={nomCompte}
          onChange={handleChange}
          />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className="label">Numéro de carte</Form.Label>
          <Form.Control type="number" placeholder="Entrer votre numéro de carte" 
            required 
            name="numCompte"
          value={numCompte}
          onChange={handleChange}
          />
      </Form.Group>
      <div className="content-button">
      <Button variant="btn-annuler" onClick={handleClose}>Annuler</Button>
      <Button className='btn-confirme' type="submit">Confirmer</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>
</div>
  )
}

export default Paiement