import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import './Profil.css'
import { Button,Form } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

  },
}));
const initialState = {
    name: '',
    tele:'',
    site:'',
    info:'',
    err: '',
    success: ''
}
function Profil() {
  const classes = useStyles();

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name,tele,site,info, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

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
            axios.patch('/user/updateInstr', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar,
                tele: tele ? tele : user.tele,
                site: site ? site : user.site,
                info: info ? info : user.info,

            },
            {
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated profil instructeur Success!"})
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
            {loading && <h3>Loading.....</h3>}
      <h2 className='title-profil'>Informations générales</h2>
      <div className='content-profil'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
         <Form.Group className="mb-3" >
         <div className={classes.root}>
       <Avatar src={avatar ? avatar : user.avatar} alt="" className={classes.large} />
       </div>
       <Form.Label htmlFor="file"> 
       <img src="images/Camera-circle.png" alt="" className='camera-center'/>
       </Form.Label>
       <Form.Control type="file"  id="file"
     name="avatar"
    defaultValue={user.avatar}
    onChange={changeAvatar}
    style={{display:"none"}}
    />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Nom complet</Form.Label>
    <Form.Control type="text" placeholder="Entrer votre nom et prénom" 
    name="name" 
    required 
    defaultValue={user.name}
    onChange={handleChange}
    />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Adresse e-mail</Form.Label>
    <Form.Control type="email" placeholder="nom@email.com" 
    name="email" 
    defaultValue={user.email}
    disabled 
   />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Numéro de téléphone</Form.Label>
    <Form.Control type="text" placeholder="Entrer votre numéro de téléphone" 
    name="tele" 
    defaultValue={user.tele}
   />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Site web personnel</Form.Label>
    <Form.Control type="text" placeholder="Enter votre URL" 
    name="site" 
    defaultValue={user.site}
   />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Label className="label">Sur moi</Form.Label>
    <Form.Control as="textarea" rows={3} placeholder="Ecrire ici..." 
    name="info" 
    defaultValue={user.info}
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

export default Profil