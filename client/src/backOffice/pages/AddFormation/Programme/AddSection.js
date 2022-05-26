import React ,{useState, useEffect} from 'react'
import {fetchFormation, dispatchGetFormation} from '../../../../redux/actions/formationsAction'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import '../AddFormation.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

    const sectionState = {
    titre:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function AddSection(){
    const [section, setSection] = useState(sectionState)
    const {objectif,titre,err, success} = section
    const formations = useSelector(state => state.formations)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {titre1} = useParams();
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
  
          useEffect(() => {
            fetchFormation(token,titre1).then(res =>{
                  dispatch(dispatchGetFormation(res))
              })
            },[token,titre1, dispatch, callback])
            

            const handleChangeInput = e => {
                const {name, value} = e.target
                setSection({...section, [name]:value, err: '', success: ''})
              }

            const handleSubmit = async (e,titre1) => {
                e.preventDefault()
                try {
                if(formations.titre !== titre1){
                    const res = await axios.post(`/ajoutsect/${formations.titre}`,
                    {titre, objectif, formation: formations._id}, {headers: {Authorization: token}
                })
                    setSection({...section, err: '', success: res.data.msg})
                    setOpen(true);
                   

                  } } catch (err) { 
                err.response.data.msg &&
                setSection({...section, err: err.response.data.msg, success: ''})
                setOpen1(true);
                }
            }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du section</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="titre"
                    required 
                    value={titre}
                    onChange={handleChangeInput} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Qu'est-ce que les participants seront capables de faire à la fin de cette section ?</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Saisir un objectif d'apprentissage" 
                    name="objectif"
                    value={objectif}
                    onChange={handleChangeInput} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  type="submit">Enregistrer la section</Button>
            </div>
          </Form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose1} severity="error">
                {err}
                </Alert>
        </Snackbar>
      </>
    )
}

export default AddSection