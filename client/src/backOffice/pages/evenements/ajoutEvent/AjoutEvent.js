import React from 'react'
import { Button, Form } from 'react-bootstrap'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import './AjoutEvent.css'
function AjoutEvent() {
  return (
    <div className='ajout-event'>
        <BreadcrumbHeader item="Mes événements" link="mes-evenements" active="Ajouter un nouveau événement"/>
        <div className='content-ajout'>
        <Form className="form-event">
        <Form.Group className="mb-3" >
    <Form.Label className="label">Titre d'événement</Form.Label>
    <Form.Control type="text" placeholder="Entrer le titre de votre événements" />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Détails</Form.Label>
    <Form.Control as="textarea" rows={5} placeholder="Ecrire ici..." 
    name="info" 
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
    <Form.Control type="datetime-local" />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Date de fin</Form.Label>
    <Form.Control type="datetime-local" />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Nombre de tickets</Form.Label>
    <Form.Control type="number" placeholder="0"/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Prix
    <Form.Check 
    type="switch"
    id="custom-switch"
    label="Gratuit"
  />
  </Form.Label>
    <Form.Control type="number" placeholder="0,000 Dt"/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Type d'événement</Form.Label>
    <Form.Check type="radio" label="En ligne" />
    <Form.Control type="text" placeholder="Lien de la réunion en ligne" />
    <Form.Check type="radio" label="Sur place" />
    <Form.Control type="text" placeholder="Adresse..." />
  </Form.Group>
  <div className="content-btn">
  <Button className='btn-annnuler'>Annuler</Button>
  <Button  className='btn-confirme'>Confirmer</Button>
  </div>

        </Form>
        </div>
    </div>
  )
}

export default AjoutEvent