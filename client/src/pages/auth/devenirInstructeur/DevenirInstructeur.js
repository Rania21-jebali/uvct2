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
    skills:'',
    description:'',
    formation:'',
    err: '',
    success: ''
}

function DevenirInstructeur() {
    const [user, setUser] = useState(initialState)
    const {name, email, specialite,skills,description,formation, err, success} = user
    const history = useNavigate();


    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
  
    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(specialite) || isEmpty(skills) || isEmpty(description))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})
        
        try {
            const res = await axios.post('/user/registerInstr', {
                name, email, specialite,skills,description,formation
            })

            setUser({...user, err: '', success: res.data.msg})
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
  return (
    <div className='devInst'>
    <h1> Devenir Instructeur</h1>
      {err && ShowErrMsg(err)}
      {success && ShowSuccessMsg(success)}
        <Form onSubmit={handleSubmit}>
        <Form.Group  >
        <Form.Label >Prénom et nom</Form.Label>
        <Form.Control type="Normal text"
         placeholder=" Prénom et nom" 
         name="name"
         value={name}
         onChange={handleChangeInput} 
        required 
        />
      </Form.Group>
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label >Email</Form.Label>
        <Form.Control type="email" placeholder="Email"
        name="email"
        required 
        value={email}
        onChange={handleChangeInput} 
         />
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label >Spécialité</Form.Label>
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
      <Form.Group className="mb-3"   >
      <Form.Label >Compétences</Form.Label>
        <Form.Control type="text" 
        placeholder="Citez votre compétences"
         name="skills"
        required 
        value={skills}
        onChange={handleChangeInput} 
        style={{ height: '100px' }}
        />
      </Form.Group>
      <Form.Group className="mb-3"   >
      <Form.Label >Formations</Form.Label>
        <Form.Control type="text" 
        placeholder="Citez votre formations (diplôme,licence,mastère,...)"
         name="formation"
        required 
        value={formation}
        onChange={handleChangeInput} 
        style={{ height: '100px' }}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label >Résumé</Form.Label>
        <Form.Control type="text" 
        placeholder="Parlez plus de vous"
         name="description"
        required 
        value={description}
        onChange={handleChangeInput} 
        style={{ height: '100px' }}
        />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button className='btn-devInst'
      type="submit" size="lg"
     >
        Envoyer
      </Button>
   </div>
      </Form>
      </div>
  )
}

export default DevenirInstructeur