import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import '../AddFormation.css'
import { dispatchGetSection, fetchSection } from '../../../../redux/actions/sectionAction'
import { useEffect } from 'react'
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

function UpdateSection(props){
    const [section, setSection] = useState(sectionState)
    const {objectif,titre,err,success} = section
    const sections5 = useSelector(state => state.sections)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = props.id
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
                    fetchSection(token,id).then(res =>{
                        dispatch(dispatchGetSection(res))
                    })
                },[token,id, dispatch, callback])

                console.log(sections5[0].titre)

                const handleChange = e => {
                    const {name, value} = e.target
                    setSection({...section, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updatesection/${props.id}`, {
                       titre: titre ? titre : section.description,
                       objectif : objectif ? objectif : section.objectif, 
                    }, { headers: {Authorization: token} })
                    setSection({...section, err: '' , success: "Success!"})
                  
               } catch (err) {
                    setSection({...section, err: err.response.data.msg , success: ''})
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
                    defaultValue={sections5[0].titre}
                    onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Qu'est-ce que les participants seront capables de faire à la fin de cette section ?</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Saisir un objectif d'apprentissage" 
                    name="objectif"
                    defaultValue={sections5[0].objectif}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Enregistrer la section</Button>
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

export default UpdateSection