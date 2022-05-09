import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchUserDetails, dispatchGetUserDetails} from '../../../../redux/actions/authAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import { Button,Form, Spinner } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useParams } from 'react-router-dom'

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
    info:'',
    err: '',
    success: ''
}

function Profile() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {admin} = auth
    const [data, setData] = useState(initialState)
    const {name,tele,email, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()

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

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
   
    const updateInfor = () => {
        try {
            axios.patch(`/user/updateInfo/${id}`, {
                name: name ? name : admin.name,
                avatar: avatar ? avatar : admin.avatar,
                tele: tele ? tele : admin.tele,
                email: email ? email: admin.email,
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const handleUpdate = () => {
         updateInfor()
    }
    
  return (
    <div className="profile">
            {err && ShowErrMsg(err)}
            {success && ShowSuccessMsg(success)}
      <div className='content-profil'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
       <Form.Group className="mb-3" >
         {loading && <Spinner animation="border" variant="secondary" />}
          <div className={classes.root}>
           <Avatar src={avatar ? avatar : admin.avatar} alt="" className={classes.large} />
          </div>
          <Form.Label htmlFor="file"> 
            <img src="images/Camera-circle.png" alt="" className='camera-center'/>
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
               required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrer votre numéro de téléphone" 
                name="tele" 
              defaultValue={admin.tele}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Rôle</Form.Label>
              <Form.Control type="text" placeholder="Entrer role" 
                name="role" 
              defaultValue={admin.tele}
              onChange={handleChange}
               required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Spécialité</Form.Label>
              <Form.Control type="text" placeholder="Entrer spécialité" 
                name="tele" 
              defaultValue={admin.tele}
              onChange={handleChange}
               required
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Tâches</Form.Label>
              <Form.Control type="text" placeholder="Entrer tache" 
                name="tele" 
              defaultValue={admin.tele}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Mot de passe</Form.Label>
              <Form.Control type="text" placeholder="Entrer mot de passe" 
                name="tele" 
              defaultValue={admin.password}
            />
          </Form.Group>
          <div className="content-button">
                  <Button disabled={loading} onClick={handleUpdate} className='btn-sauvg'>Sauvegarder les modifications</Button>
           </div>
        </Form>
      </div>
    </div>
  )
}

export default Profile