import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../../redux/actions/usersAction'
import { Button, Form } from 'react-bootstrap'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import './AjoutEvent.css'

const initialState = {
  titre:'',
  details:'',
  dateDebut:'',
  dateFin:'',
  nbTicket:'',
  prix:'',
  typeEvent:'',
  affiche:'',
  err: '',
  success: ''
}

function AjoutEvent() {
  const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
    const [event, setEvent] = useState(initialState)
    const {titre,details,dateDebut,dateFin, nbTicket, prix, typeEvent, affiche, err, success} = event
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChangeInput = e => {
      const {name, value} = e.target
      setEvent({...event, [name]:value, err: '', success: ''})
  }
    const handleSubmit = async e => {
      e.preventDefault()
      try {
          const res = await axios.post('/addEvent', {
            titre,details,dateDebut,dateFin, nbTicket, prix, typeEvent, affiche
          },{

            headers: {Authorization: token}
        })

          setEvent({...event, err: '', success: res.data.msg})

      } catch (err) {
          err.response.data.msg && 
          setEvent({...event, err: err.response.data.msg, success: ''})
      }
  }
  return (
  <div className='ajout-event'>
    <BreadcrumbHeader item="Mes événements" link="mes-evenements" active="Ajouter un nouveau événement"/>
      <div className='content-ajout'>
      {err && ShowErrMsg(err)}
    {success && ShowSuccessMsg(success)}
        <Form className="form-event" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
             <Form.Label className="label">Titre d'événement</Form.Label>
              <Form.Control type="text" 
              placeholder="Entrer le titre de votre événements" 
              name="titre"
              value={titre}
              onChange={handleChangeInput} 
              required 
              />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label className="label">Détails</Form.Label>
            <Form.Control as="textarea" rows={5} 
            placeholder="Ecrire ici..." 
            name="details" 
            value={details}
            onChange={handleChangeInput} 
            required 
          />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label className="label">Ajouter une Affiche</Form.Label>
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
              <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
            style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Date de début</Form.Label>
            <Form.Control type="datetime-local" 
                name="dateDebut"
                value={dateDebut}
                onChange={handleChangeInput} 
                required 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Date de fin</Form.Label>
            <Form.Control type="datetime-local"
                name="dateFin"
                value={dateFin}
                onChange={handleChangeInput} 
                required  />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nombre de tickets</Form.Label>
            <Form.Control type="number" 
            placeholder="0"
            name="nbTicket"
            value={nbTicket}
            onChange={handleChangeInput} 
            required 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Prix
            <Form.Check 
            type="switch"
            id="custom-switch"
            label="Gratuit"
          />
          </Form.Label>
            <Form.Control type="number"
            placeholder="0,000 Dt"
            name="prix"
            value={prix}
            onChange={handleChangeInput} 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Type d'événement</Form.Label>
            <Form.Check type="radio" label="En ligne" />
            <Form.Control type="text" placeholder="Lien de la réunion en ligne"
            name="typeEvent"
            value={typeEvent}
            onChange={handleChangeInput} 
              />
            <Form.Check type="radio" label="Sur place" />
            <Form.Control type="text" placeholder="Adresse..." 
              name="typeEvent"
              value={typeEvent}
              onChange={handleChangeInput} 
            />
          </Form.Group>
      <div className="content-btn">
          <Button className='btn-annnuler'>Annuler</Button>
          <Button  className='btn-confirme'  type="submit">Confirmer</Button>
      </div>
    </Form>
  </div>
</div>
  )
}

export default AjoutEvent