import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
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
    err: '',
    success: ''
}

function ApprenantAdd() {
    const [data, setData] = useState(initialState)
    const {name, tele, email, password,cf_password, err, success} = data
    const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
        const handleChangeInput = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err: '', success: ''})
        }

        const handleSubmit = async e => {
          e.preventDefault()
          if(isEmpty(name) || isEmpty(password) || isEmpty(tele) || isEmpty(email))
                  return setData({...data, err: "Please fill in all fields.", success: ''})
    
          if(!isEmail(email))
              return setData({...data, err: "Invalid emails.", success: ''})
    
          if(isLength(password))
              return setData({...data, err: "Password must be at least 6 characters.", success: ''})
    
          try {
              const res = await axios.post('/user/registerApprenant', {
                  name, email, tele, password
              },{
                headers: {Authorization: token}
              })
    
              setData({...data, err: '', success: res.data.msg})
              setOpen(true)
    
          } catch (err) {
              err.response.data.msg && 
              setData({...data, err: err.response.data.msg, success: ''})
              setOpen2(false)
          }
        }
   
  return (
    <div className="profile">
    <BreadcrumbHeader item="Liste apprenants" link="/apprenants" active="Ajouter apprenant"/>
      <div className='content-profil'>
       <Form className='form-profil' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer son nom et prénom" 
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
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrer son numéro de téléphone" 
                name="tele" 
                value={tele}
                required 
                onChange={handleChangeInput}
            />
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
          <Form.Label className="label">Confirmé mot de passe</Form.Label>
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

export default ApprenantAdd