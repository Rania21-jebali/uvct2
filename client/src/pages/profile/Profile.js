import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {isLength, isMatch} from '../../components/utils/validation/Validation'
import {ShowSuccessMsg, ShowErrMsg} from '../../components/utils/notifications/Nofification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/usersAction'
import './Profile.css'
import { Button,Form } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const classes = useStyles();

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isInstr} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

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
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },
            {
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
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
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }
    
    return (
        <div className='profil'>
        <div className="profile_page">
        {err && ShowErrMsg(err)}
            {success && ShowSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
            <div className="col-left">
                <h2>
                {isAdmin ? "Admin Profile": (isInstr ? "Instructeur Profile" : "Apprenant Profile")}
                </h2>
                <Form >
             <Form.Group className="mb-3" >
             <div className={classes.root}>
      <Avatar src={avatar ? avatar : user.avatar} alt="" className={classes.large} />
    </div>
            
  <Form.Control type="file" 
   name="avatar"
    defaultValue={user.avatar}
    onChange={changeAvatar}
    />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Control type="text" placeholder="name" 
    name="name" 
    required 
    defaultValue={user.name}
    onChange={handleChange}
    />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Control type="email" placeholder="Email" 
    name="email" 
    defaultValue={user.email}
    disabled 
   />
  </Form.Group>
  <Form.Group className="mb-3" >
  <Form.Control type="password" placeholder="Enter password" 
    name="password"
    value={password}
    onChange={handleChange}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Confirm password" 
    name="cf_password"
    value={cf_password}
    onChange={handleChange}
   />
  </Form.Group>
          <Button disabled={loading} onClick={handleUpdate} className='btn-upd'>Update</Button>
                </Form>
</div>
</div>
       
        </div>
    )
}

export default Profile