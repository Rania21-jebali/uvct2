import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import { Button, Form, Spinner } from 'react-bootstrap'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import './AjoutEvent.css'
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    const token = useSelector(state => state.token)
    const [event, setEvent] = useState(initialState)
    const {titre,details,dateDebut,dateFin, nbTicket, prix, typeEvent, err, success} = event
    const [affiche, setAffiche] = useState(false)
    const [loading, setLoading] = useState(false)
    const [gratuit, setGratuit] = useState(false);
    const [enLigne, setEnLigne] = useState(false);
    const [surPlace, setSurPlace] = useState(false);

      const handleChangeInput = e => {
        const {name, value} = e.target
        setEvent({...event, [name]:value, err: '', success: ''})
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
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
              setLoading(false)
              setAffiche(res.data.url)
            } 
        catch (err) {
            setAffiche({...event, err: err.response.data.msg , success: ''})
        }
      }

        const handleSubmit = async e => {
          e.preventDefault()
          try {
              const res = await axios.post('/addEvent', {
                titre,details,dateDebut,dateFin, nbTicket, prix, typeEvent, affiche, gratuit,
                enLigne, surPlace
              },{

                headers: {Authorization: token}
            })

              setEvent({...event, err: '', success: res.data.msg})

          } catch (err) {
              err.response.data.msg && 
              setEvent({...event, err: err.response.data.msg, success: ''})
          }
        }

        const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

        const handleFormat = (event, newFormats) => {
          setFormats(newFormats);
        };

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
          <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" size="small">
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
            <Form.Control as="textarea" rows={5} 
            placeholder="Ecrire ici..." 
            name="details" 
            value={details}
            onChange={handleChangeInput} 
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
                : event.affiche} alt="" className="affiche-img"></img>
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
            value={gratuit}
            onChange={(e) => setGratuit(e.target.checked)}
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
            <Form.Check type="radio" label="En ligne" 
              value={enLigne}
            onChange={(e) => setEnLigne(e.target.checked)}
            />
            <Form.Control type="text" placeholder="Lien de la réunion en ligne"
            name="typeEvent"
            value={typeEvent}
            onChange={handleChangeInput} 
              />
            <Form.Check type="radio" label="Sur place" 
              value={surPlace}
              onChange={(e) => setSurPlace(e.target.checked)}
            />
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