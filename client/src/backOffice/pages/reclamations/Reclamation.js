import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchReclamation, dispatchGetReclamation} from '../../../redux/actions/reclamationAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../redux/actions/usersAction'
import {isEmpty} from '../../../components/utils/validation/Validation'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import DayJS from 'react-dayjs';
import { useParams } from 'react-router-dom';
import Avatar1 from '../../../components/Avatar/Avatar';
import './Reclamations.css'
import ReplyIcon from '@material-ui/icons/Reply';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const initialState = {
    message:'',
    err: '',
    success: ''
  }

function Reclamation() {
    const [reclamation, setReclamation] = useState(initialState)
    const reclamations2 = useSelector(state => state.reclamations)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const {message,err,success} = reclamation
    const users = useSelector(state => state.users)
    const [callback1, setCallback1] = useState(false)
    const dispatch1 = useDispatch()
    const [open, setOpen] = useState(false);
    const token = useSelector(state => state.token)
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };
  
      const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        };

      useEffect(() => {
        fetchReclamation(id).then(res =>{
                dispatch(dispatchGetReclamation(res))
            })
      },[id,dispatch, callback])

      useEffect(() => {
        fetchUserById(reclamations2.userId).then(res =>{
              dispatch1(dispatchGetAllUserById(res))
          })
    },[reclamations2.userId,dispatch1, callback1])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setReclamation({...reclamation, [name]:value, err: '', success: ''})
      }
    
      const handleSubmit = async e => {
        e.preventDefault()
        if( isEmpty(message))
                return setReclamation({...reclamation, err: "Please fill in all fields.", success: ''})
  
        try {
            const res = await axios.post('/addReclamation', {message}, { headers: {Authorization: token} })
  
            setReclamation({...reclamation, err: '', success: res.data.msg})
            setOpen1(true);
  
        } catch (err) {
            err.response.data.msg && 
            setReclamation({...reclamation, err: err.response.data.msg, success: ''})
            setOpen2(true);
        }
      }

  return (
    <div className='add-admin'>
      <BreadcrumbHeader item="Mes réclamations" link="/reclamations" active="réclamation"/>
        <div className='content-admin'>
        <h4>Sujet: {reclamations2.cause}</h4>
        <div className='header-reclamation'>
        <div className='userList'>
          <Avatar1 src={users.avatar}/>
           <h5>{users.name}</h5>     
        </div>
        <div><DayJS format="dddd, MMMM D, YYYY h:mm A">{users.createdAt}</DayJS></div>
        </div>
        <div>
            <p>{reclamations2.message}</p>
        </div>
        <div className='repondre-reclamation' onClick={() => setOpen(true)}>
            <ReplyIcon /><p>Réponse</p>
        </div>
        {
            open &&
            (
                <div className='add-reponse'>
                   <Form>
                   <Form.Group className="mb-3" >
                    <Form.Label className="label">Message</Form.Label>
                    <Form.Control type="text" placeholder="Ecrire ici..." as="textarea" rows={3}
                        name="message" 
                        value={message}
                        onChange={handleChangeInput} 
                        required 
                    />
                    </Form.Group>
                    <Button  className='btn-confirmer' type="submit" size="lg" >
                        Envoyer
                    </Button>
                   </Form>
                   <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose1} severity="success">
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
        </div>
    </div>
  )
}

export default Reclamation