import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import { useSelector} from 'react-redux'
import '../AddFormation.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
    const sessionState = {
    titre:'',
    err: '',
    success: ''
    }

function UpdateSession(props){
    const [session, setSession] = useState(sessionState)
    const {titre,err,success} = session
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

                const handleChange = e => {
                    const {name, value} = e.target
                    setSession({...session, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updateSession/${props.id}`, {
                       titre: titre ? titre : session.titre,
                    }, { headers: {Authorization: token} })
                    setSession({...session, err: '' , success: "Success!"})
                    setOpen(true);
                  
               } catch (err) {
                    setSession({...session, err: err.response.data.msg , success: ''})
                    setOpen1(true);
                }
              }
      
              const handleUpdate = () => {
                  updateInfor()
              }

    return(
        <>
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du section</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="titre"
                    required 
                    defaultValue={props.titre}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Enregistrer la session</Button>
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
      </>
    )
}

export default UpdateSession