import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import { Button} from 'react-bootstrap';
import axios from 'axios'
import './Adminstrateur.css'
import { Form } from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
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
    const [open1, setOpen1] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };


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
            setOpen1(true);
        }
      }
      
  return (
      <div className='add-admin'>
      <BreadcrumbHeader item="Administrateur" link="administrateurs" active="Ajouter Administrateur"/>
        <div className='content-admin'>
          <Form onSubmit={handleSubmit} className='form-admin'>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Nom complet</Form.Label>
                  <Form.Control type="text" placeholder="Entrer nom et prénom" 
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
                <Form.Label className="label">Numéro de téléphone</Form.Label>
                  <Form.Control type="text" placeholder="ex: 21 212 212" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Rôle</Form.Label>
                  <Form.Control type="text" placeholder="" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                   />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Spécialité</Form.Label>
                  <Form.Control type="text" placeholder="" 
                    name="tele" 
                    value={tele}
                    onChange={handleChangeInput} 
                    required 
                   />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Tâches</Form.Label>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose1} severity="error">
                {err}
                </Alert>
            </Snackbar>
      </div>
    
  )
}

export default AddAdmin