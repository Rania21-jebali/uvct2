import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail, isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button,Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
            setOpen1(true);
        }
      }
   
  return (
    <div className="profile">
    <BreadcrumbHeader item="Liste instructeurs" link="/instructeurs" active="Ajouter instructeur"/>
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
            <Form.Label className="label">Spécialité</Form.Label>
              <Form.Control type="text" placeholder="Entrer son spécialité" 
                name="specialite" 
                value={specialite}
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

export default InstructeurAdd