import React, {useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import axios from 'axios'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail} from '../../../components/utils/validation/Validation'
import './DevenirInstructeur.css'
import { useNavigate } from 'react-router-dom';
const initialState = {
    name: '',
    email: '',
    specialite:'',
    description:'',
    tele:'',
    err: '',
    success: ''
}

function DevenirInstructeur() {
    const [user, setUser] = useState(initialState)
    const {name, email, specialite,description,tele,err, success} = user
    const navigate = useNavigate();
    const [file, setFile] = useState(false);


    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
  
    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(specialite) || isEmpty(description))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})
        
        try {
            const res = await axios.post('/user/registerInstr', {
                name, email, specialite,description
            })

            setUser({...user, err: '', success: res.data.msg})
            navigate("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
  return (
    <div className='devInst'>
      {err && ShowErrMsg(err)}
      {success && ShowSuccessMsg(success)}
        <Form onSubmit={handleSubmit}>
        <Form.Group  >
        <Form.Label className='labelForm'>Nom complet</Form.Label>
        <Form.Control type="Normal text"
         className='inputForm'
         placeholder=" Saissiez votre nom et prénom" 
         name="name"
         value={name}
         onChange={handleChangeInput} 
         required 
        />
      </Form.Group>
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Adresse E-mail</Form.Label>
        <Form.Control type="email" placeholder="nom@eamil.com"
        name="email"
        required 
        value={email}
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Téléphone</Form.Label>
        <Form.Control type="number" placeholder="21 212 212"
        name="tele"
        required 
        value={tele}
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Votre CV</Form.Label>
        <Form.Control type="file" 
        required 
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label className='labelForm'>Spécialité</Form.Label>
        <Form.Select aria-label="Default select example"
          name="specialite"
          required 
          value={specialite}
          onChange={handleChangeInput}>
          <option>Séléctionnez votre spécialité</option>
          <option value="développement web">développement web</option>
          <option value="développement mobile">développement mobile</option>
          <option value="développement personnel">développement personnel</option>
          <option value="design">design</option>
          <option value="business">business</option>
          <option value="design">design</option>
          <option value="communication">communication</option>
          <option value="photographie">photographie</option>
          <option value="mode de vie">design</option>
          <option value="musique">musique</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label className='labelForm'>Message</Form.Label>
        <Form.Control type="text" 
         placeholder="Saissiez un message"
         name="description"
          required 
          value={description}
          onChange={handleChangeInput} 
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button className='btn-devInst' type="submit" size="lg">
        Envoyer
      </Button>
   </div>
  </Form>
</div>
  )
}

export default DevenirInstructeur