import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Parametres.css'

function MotdePasse() {
  return (
    <div className='motDePasse'>
    <Form>
    <Form.Group className="mb-3" >
    <Form.Label>Mot de passe actuel</Form.Label>
  <Form.Control type="password" placeholder="Entrer le mot de passe actuel" 
    name="password"
    />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Nouveau mot de passe</Form.Label>
  <Form.Control type="password" placeholder="Entrer le nouveau mot de passe" 
    name="password"
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Répétez le nouveau mot de passe ici</Form.Label>
    <Form.Control type="password" placeholder="Confirmer le nouveau mot de passe" 
    name="cf_password"
   />
  </Form.Group>
  <div className="content-button">
  <Button className='btn-confirme'>Changer le mot de passe</Button>
  </div>
    </Form>
    </div>

  )
}

export default MotdePasse