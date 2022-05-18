import React ,{useState} from 'react'
import { Button , Form } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import axios from 'axios'
import '../AddFormation.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

    const sessionState = {
      titre:'',
      section:'',
      err: '',
      success: ''
      }

      function AddSession(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState)
        const {titre, err, success} = session
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
            setSession({...session, [name]:value, err: '', success: ''})
          }

        const handleSubmit = async (e,idS) => {
            e.preventDefault()
            try {  if(idS !== props.id){
                const res = await axios.post("/ajoutSession",
                {titre, section: props.id }, {headers: {Authorization: token}
            })
                setSession({...session, err: '', success: res.data.msg})
                setOpen(true);
            }  
              }
          catch (err) { 
            err.response.data.msg &&
            setSession({...session, err: err.response.data.msg, success: ''})
            setOpen1(true);
            }
        }

      return(
        <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Nouvelle session</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Entrer un titre" 
                        name="titre"
                        value={titre}
                        onChange={handleChangeInput}
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Ajouter une session</Button>
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

export default AddSession