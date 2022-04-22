import React, {useState} from 'react'
import { Button ,Modal ,Form } from 'react-bootstrap';

function Coupons() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="coupon">
      <Button className='btn-event' onClick={handleShow}>Ajouter un nouveau coupon</Button>
      <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Pourcentage de remise</Form.Label>
            <Form.Select 
                required 
                name="Niveau">
                <option value="">5%</option>
                <option value="">10%</option>
        </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" >
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Remise privée"
                />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Code de coupon</Form.Label>
            <Form.Control type="number"
            placeholder="Entrez votre code"
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nombre de remises</Form.Label>
            <Form.Control type="number"
            placeholder="100"
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable après</Form.Label>
            <Form.Control type="datetime-local"
                name="dateFin"
                required  />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable jusqu'au</Form.Label>
            <Form.Control type="datetime-local"
                name="dateFin" 
                required  />
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <a href="/new-formation">
          <Button className='btn-confirme' onClick={handleClose}>
            Créer
          </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Coupons