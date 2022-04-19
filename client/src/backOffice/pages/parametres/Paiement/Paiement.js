import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Parametres.css'

function Paiement() {
  return (
    <div className='paiement'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="label">Type de compte</Form.Label>
    <Form.Select >
    <option>Compte bancaire</option>
  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="label">Pays de compte bancaire</Form.Label>
    <Form.Select >
    <option>Tunisie</option>
  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Nom du compte</Form.Label>
    <Form.Control type="text" placeholder="Entrer le nom de votre carte" />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className="label">Numéro de carte</Form.Label>
    <Form.Control type="number" placeholder="Entrer votre numéro de carte" />
  </Form.Group>
  <div className="content-button">
  <Button className='btn-confirme'>Confirmer</Button>
  </div>
    </Form>
    </div>
  )
}

export default Paiement