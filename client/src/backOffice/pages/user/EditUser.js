import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchUserDetails, dispatchGetUserDetails} from '../../../redux/actions/authAction'
import {isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button,Form, Spinner } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './EditUser.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
        const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
            margin: theme.spacing(1),
            border:" 0.5px solid #999999",
            padding:"5px",
            boxSizing: "border-box",
            },
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            borderRadius:"50%",

        },
        }));

        const initialState = {
            name: '',
            tele:'',
            email:'',
            specialite:'',
            password:'',
            cf_password: '',
            err: '',
            success: ''
        }

function EditUser() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {admin} = auth
    const [data, setData] = useState(initialState)
    const {name,tele,email,specialite,password, cf_password, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const handleClose1= (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen1(false);
    };

        useEffect(() => {
          fetchUserDetails(token,id).then(res =>{
                dispatch(dispatchGetUserDetails(res))
            })
        },[token,id, dispatch, callback])

        const handleChange = e => {

            const {name, value} = e.target

            setData({...data, [name]:value, err:'', success: ''})
        }

        const changeAvatar = async(e) => {
            e.preventDefault()
            try {
                const file = e.target.files[0]

                if(!file) return setData({...data, err: "Aucun fichier n'a été téléchargé." , success: 'Photo téléchargée'})

                if(file.size > 1024 * 1024)
                    return setData({...data, err: "Taille trop grande." , success: 'Photo téléchargée'})

                if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                    return setData({...data, err: "Le format de fichier est incorrect." , success: 'Photo téléchargée'})

                let formData =  new FormData()
                formData.append('file', file)

                setLoading(true)
                const res = await axios.post('/api/upload_avatar', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })

                setLoading(false)
                setAvatar(res.data.url)
                setOpen(true);
                
            } catch (err) {
                setData({...data, err: err.response.data.msg , success: ''})
                setOpen1(true);

            }
        }
   
        const updateInfor = () => {
            try {
                axios.patch(`/user/updateInfo/${id}`, {
                    name: name ? name : admin.name,
                    avatar: avatar ? avatar : admin.avatar,
                    tele: tele ? tele : admin.tele,
                    email: email ? email: admin.email,
                    specialite: email ? email: admin.specialite,

                },{
                    headers: {Authorization: token}
                })

                setData({...data, err: '' , success: "Profile modifié!"})
                setOpen(true);
                window.location.reload(false);
            } catch (err) {
                setData({...data, err: err.response.data.msg , success: ''})
                setOpen1(true);
            }
        }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar || tele || specialite || email) updateInfor()
        if(password) updatePassword()
    }

  return (
      <div className='content-user'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
         <Form.Group className="mb-3" >
         {loading && <Spinner animation="border" variant="secondary" />}
          <div className={classes.root}>
           <img src={avatar ? avatar : admin.avatar} alt="" className={classes.large} />
          </div>
          <Form.Label htmlFor="file"> 
           <PhotoCameraIcon />
           </Form.Label>
            <Form.Control type="file"  id="file"
              name="avatar"
             defaultValue={admin.avatar}
              onChange={changeAvatar}
              style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer votre nom et prénom" 
                name="name" 
                required 
                defaultValue={admin.name}
                onChange={handleChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="nom@email.com" 
                name="email" 
               defaultValue={admin.email}
               onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrer numéro de téléphone" 
                name="tele" 
              defaultValue={admin.tele}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Spécialité</Form.Label>
            <Form.Select
              name="specialite"
              required 
              onChange={handleChange}>
              <option defaultValue={admin.specialite}>{admin.specialite}</option>
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
            <Form.Label className="label">Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer mot de passe" 
                name="password" 
              defaultValue={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="label">Confirmé mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" 
                name="cf_password"
                required 
                value={cf_password}
                onChange={handleChange}
               />
            </Form.Group>
          <div className="content-btn">
                  <Button className='btn-annnuler' href="/instructeurs">Annuler</Button>
                  <Button disabled={loading} onClick={handleUpdate} className='btn-confirme'>Sauvegarder les modifications</Button>
           </div>
        </Form>
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

export default EditUser