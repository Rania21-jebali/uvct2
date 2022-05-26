import React ,{useState} from 'react'
import { Button , Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {fetchEvent, dispatchGetEvent} from '../../../../redux/actions/eventsAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

function UpdateEvent(props){
    const token = useSelector(state => state.token)
    const [event, setEvent] = useState(initialState)
    const {titre,details,dateDebut,dateFin, nbTicket, prix, typeEvent, err, success} = event
    const [affiche, setAffiche] = useState(false)
    const [loading, setLoading] = useState(false)
    const [gratuit, setGratuit] = useState(false);
    const [enLigne, setEnLigne] = useState(false);
    const [surPlace, setSurPlace] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const events1 = useSelector(state => state.events);
    const {id} = useParams()
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()

        useEffect(() => {
            fetchEvent(id).then(res =>{
                dispatch(dispatchGetEvent(res))
            })
        },[id, dispatch, callback])

        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        };

        const handleClose1 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen1(false);
          };

        const handleChange = e => {
            const {name, value} = e.target
            setEvent({...event, [name]:value, err:'', success: ''})
            }

        const changeAffiche = async(e) => {
                    e.preventDefault()
                    try {
                        const file = e.target.files[0]
              
                        if(!file) return setEvent({...event, err: "No files were uploaded." , success: ''})
              
                        if(file.size > 1024 * 1024)
                            return setEvent({...event, err: "Size too large." , success: ''})
              
                        if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                            return setEvent({...event, err: "File format is incorrect." , success: ''})
              
                        let formData =  new FormData()
                        formData.append('file', file)
              
                        setLoading(true)
                        const res = await axios.post('/api/uploadAffiche', formData, {
                            headers: {'content-type': 'multipart/form-data'}
                        })
              
                        setLoading(false)
                        setAffiche(res.data.url)
                        setOpen(true);
                        
                    } catch (err) {
                        setAffiche({...event, err: err.response.data.msg , success: ''})
                        setOpen1(true);
                    }
        }

        const updateInfor = async() => {
                try {
                    axios.patch(`/updateEvent/${id}`, {
                       titre: titre ? titre : events1.titre,
                       details: details ? details : events1.details,
                       dateDebut: dateDebut ? dateDebut : events1.dateDebut,
                       dateFin: dateFin ? dateFin : events1.dateFin,
                       nbTicket:  nbTicket ?  nbTicket : events1.nbTicket,
                       prix:  prix ?  prix : events1.prix,
                       typeEvent:  typeEvent ?  typeEvent : events1.typeEvent,
                       affiche:  affiche ?  affiche : events1.affiche,
                    },{

                        headers: {Authorization: token}
                    })
                    setEvent({...event, err: '' , success: "Événement modifié !"})
                    setOpen(true);
                  
               } catch (err) {
                    setEvent({...event, err: err.response.data.msg , success: ''})
                    setOpen1(true);
                }
        }
      
        const handleUpdate = () => {
                  updateInfor()
        }

    return(
        <div className='ajout-event'>
          <BreadcrumbHeader item="Mes événements" link="/evenements" active="Modifier événement"/>
          <div className='content-ajout'>
            <Form className="form-event">
              <Form.Group className="mb-3" >
                 <Form.Label className="label">Titre d'événement</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Entrer le titre de votre événements" 
                  name="titre"
                  defaultValue={events1.titre}
                  onChange={handleChange} 
                  required 
                  />
              </Form.Group>
              <Form.Group className="mb-3" >
              <Form.Label className="label">Détails</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder="Ecrire ici..." 
                name="details" 
                defaultValue={events1.details}
                onChange={handleChange} 
                required 
              >
              </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" >
              <Form.Label className="label">Ajouter une Affiche</Form.Label>
              {loading && <Spinner animation="border" variant="secondary" />}
                  <div className="content-affiche">
                  <Form.Label htmlFor="file" > 
                    <img src={affiche ? 
                    affiche 
                    : events1.affiche} alt="" className="affiche-img"></img>
                  <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
                  </Form.Label>
                  </div>
                <Form.Control type="file" id="file"
                    onChange={changeAffiche}
                    style={{display:"none"}}
              />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Date de début</Form.Label>
                <Form.Control type="datetime-local" 
                    name="dateDebut"
                    defaultValue={events1.dateDebut}
                    onChange={handleChange} 
                    required 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Date de fin</Form.Label>
                <Form.Control type="datetime-local"
                    name="dateFin"
                    defaultValue={events1.dateFin}
                    onChange={handleChange} 
                    required  />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Nombre de tickets</Form.Label>
                <Form.Control type="number" 
                placeholder="0"
                name="nbTicket"
                defaultValue={events1.nbTicket}
                onChange={handleChange} 
                required 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Gratuit"
                defaultValue={events1.gratuit}
                onChange={(e) => setGratuit(e.target.checked)}
              />
              </Form.Label>
                <Form.Control type="number"
                placeholder="0,000 Dt"
                name="prix"
                defaultValue={events1.prix}
                onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Type d'événement</Form.Label>
                <Form.Check type="radio" label="En ligne" 
                  defaultValue={events1.enLigne}
                onChange={(e) => setEnLigne(e.target.checked)}
                />
                <Form.Control type="text" placeholder="Lien de la réunion en ligne"
                name="typeEvent"
                defaultValue={events1.typeEvent}
                onChange={handleChange} 
                  />
                <Form.Check type="radio" label="Sur place" 
                  defaultValue={events1.surPlace}
                  onChange={(e) => setSurPlace(e.target.checked)}
                />
                <Form.Control type="text" placeholder="Adresse..." 
                  name="typeEvent"
                  defaultValue={events1.typeEvent}
                  onChange={handleChange} 
                />
              </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' onClick={handleUpdate}>Confirmer</Button>
          </div>
        </Form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose1} severity="error">
              {err}
            </Alert>
          </Snackbar>
        </div>
    )
}

export default UpdateEvent