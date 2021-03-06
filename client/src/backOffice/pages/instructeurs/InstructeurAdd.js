import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button,Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader'
import axios from 'axios'
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../components/Snackbar/SnackbarErr'

const initialState = {
    name: '',
    tele:'',
    email:'',
    password:'',
    cf_password: '',
    specialite:'',
    err: '',
    success: ''
}
function InstructeurAdd() {
    const [data, setData] = useState(initialState)
    const {name, tele, email, specialite, password,cf_password, err, success} = data
    const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

        const handleChangeInput = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err: '', success: ''})
        }

      const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password) || isEmpty(tele))
                return setData({...data, err: "Please fill in all fields.", success: ''})
  
        if(!isEmail(email))
            return setData({...data, err: "Invalid emails.", success: ''})

            if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
  
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})
  
        try {
            const res = await axios.post('/user/addInstructeur', {
                name, email, tele, specialite, password
            },{
              headers: {Authorization: token}
            })
  
            setData({...data, err: '', success: res.data.msg})
            setOpen(true);
  
        } catch (err) {
            err.response.data.msg && 
            setData({...data, err: err.response.data.msg, success: ''})
            setOpen2(true);
        }
      }
   
  return (
    <div className="profile">
    <BreadcrumbHeader item="Liste instructeurs" link="/instructeurs" active="Ajouter instructeur"/>
      <div className='content-profil'>
       <Form className='form-profil' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer son nom et pr??nom" 
                name="name"
                value={name} 
                required 
                onChange={handleChangeInput}
              />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="nom@email.com" 
                name="email" 
                value={email}
                required 
                onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Num??ro de t??l??phone</Form.Label>
              <Form.Control type="text" placeholder="Entrer son num??ro de t??l??phone" 
                name="tele" 
                value={tele}
                required 
                onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
              <Form.Label className='labelForm'>Sp??cialit??</Form.Label>
              <Form.Select aria-label="Default select example"
                name="specialite"
                required
                value={specialite}
                onChange={handleChangeInput}>
                <option>S??l??ctionnez votre sp??cialit??</option>
                <option value="D??veloppement web">D??veloppement web</option>
                <option value="D??veloppement mobile">D??veloppement mobile</option>
                <option value="D??veloppement personnel">D??veloppement personnel</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Photographie">Photographie</option>
                <option value="Musique">Musique</option>
              </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer mot de passe" 
                name="password" 
                value={password}
                required 
                onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="label">Confirm?? mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" 
                name="cf_password"
                required 
                value={cf_password}
                onChange={handleChangeInput} 
               />
            </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' type="submit">Ajouter</Button>
          </div>
        </Form>
      </div>
      <SnackbarSuccess success={success} open={open}/>
      <SnackbarErr err={err} open2={open2}/>
    </div>
  )
}

export default InstructeurAdd