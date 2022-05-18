import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './Profil.css'
import { Button,Form} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { message } from 'antd';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 2 });
  }, 1000);
};

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
    site:'',
    info:'',
    err: '',
    success: ''
}
function Profil() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user,isInstr} = auth
    const [data, setData] = useState(initialState)
    const {name,tele,site,info, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };

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

            }, { headers: {Authorization: token} })
            setData({...data, err: '' , success: "Updated profil instructeur Success!"})
            setOpen(true);
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            setOpen2(true);
        }
    }
    const handleUpdate = () => {
         updateInfor()
    }
  return (
    <div className="profile">
      <h2 className='title-profil'>Informations générales</h2>
      <div className='content-profil'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
         <Form.Group className="mb-3" >
         {loading && openMessage() }
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
                onChange={handleChange}
            />
          </Form.Group>
          { isInstr && 
            (<>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Site web personnel</Form.Label>
                  <Form.Control type="text" placeholder="Enter votre URL" 
                    name="site" 
                    defaultValue={user.site}
                    onChange={handleChange}
                />
             </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Sur moi</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Ecrire ici..." 
                    name="info" 
                    defaultValue={user.info}
                    onChange={handleChange}
                />
              </Form.Group>
            </>
            )
          }
          <div className="content-button">
                  <Button disabled={loading} onClick={handleUpdate} className='btn-sauvg'>Sauvegarder les modifications</Button>
           </div>
        </Form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose2} severity="error">
          {err}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Profil