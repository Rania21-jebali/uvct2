import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import { Button} from 'react-bootstrap';
import axios from 'axios'
import './Adminstrateur.css'
import { Form } from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../components/Snackbar/SnackbarErr';

  const initialState = {
    name: '',
    email:'',
    tele:'',
    password:'',
    err: '',
    success: ''
  }

function AddAdmin() {
    const [data, setData] =useState(initialState);
    const {name,email,tele,password, err, success} = data
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
  
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})
  
        try {
            const res = await axios.post('/user/registerAdmin', {
                name, email, tele, password
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
      <div className='add-admin'>
        <BreadcrumbHeader item="Administrateur" link="administrateurs" active="Ajouter Administrateur"/>
        <div className='content-admin'>
          <Form onSubmit={handleSubmit} className='form-admin'>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Nom complet</Form.Label>
                  <Form.Control type="text" placeholder="Entrer nom et pr??nom" 
                    name="name" 
                    value={name}
                    onChange={handleChangeInput} 
                    required 
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Adresse e-mail</Form.Label>
                  <Form.Control type="email" placeholder="nom@email.com" 
                    name="email" 
                    value={email}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Num??ro de t??l??phone</Form.Label>
                  <Form.Control type="text" placeholder="ex: 21 212 212" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">R??le</Form.Label>
                  <Form.Control type="text" placeholder="" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                   />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Sp??cialit??</Form.Label>
                  <Form.Control type="text" placeholder="" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                   />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">T??ches</Form.Label>
                  <Form.Control type="text" placeholder="" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                    />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Mot de passe</Form.Label>
                  <Form.Control type="password" placeholder="Entrez mot de passe" 
                    name="password"
                    value={password}
                    onChange={handleChangeInput} 
                    required  
                  />
            </Form.Group>
            <div className='ctn-btn-admin'>
            <Button  className='btn-annuler' size="lg" >
                Annuler
            </Button>
            <Button  className='btn-confirmer' type="submit" size="lg" >
                confirmer
            </Button>
            </div>
          </Form>
        </div>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
      </div> 
  )
}

export default AddAdmin