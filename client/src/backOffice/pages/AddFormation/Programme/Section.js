import React ,{useState, useEffect} from 'react'
import {fetchSection, dispatchGetSection} from '../../../../redux/actions/sectionAction'
import { Button , Modal } from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import AfficheSession from './AfficheSession';
import AddSession from './AddSession';
import '../AddFormation.css'
import UpdateSection from './UpdateSection'

    const sectionState = {
    titre:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function Section(props) {
    const token = useSelector(state => state.token)
    const sections = useSelector(state => state.sections)
    const [session, setSession] = useState(false)
    const [edit, setEdit] = useState(false)
    const [modifier, setModifier] = useState(false)
    const [callback, setCallback] = useState(false)
    const [section, setSection] = useState(sectionState)
    const [callback3, setCallback3] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const {id} = props.id
   
        
            useEffect(() => {
                fetchSection(token,id).then(res =>{
                  dispatch(dispatchGetSection(res))
              })
                },[token,id, dispatch, callback])

        const handleDelete = async (id) => {
            try {
                if(sections[0]._id !== id){
                        await axios.delete(`/deleteSection/${id}`, {
                            headers: {Authorization: token}
                        })
                        setCallback3(!callback3)
                }
              }   catch (err) {
                setSection({...section, err: err.response.data.msg , success: ''})
            }
            } 
            
  return (
    <div>
         <div onMouseEnter={() => setEdit(true)}  onMouseLeave={() => setEdit(false)} >
                    Section {props.num}:  
                    <DescriptionIcon className="icon-prog" />
                    {props.titre}
                    {edit && (
                      <>
                      <EditIcon className="icon-prog" onClick={() => setModifier(true)}/> 
                      <DeleteOutlineIcon className="icon-prog" />
                    </>)
                    }</div>
                    {
                      modifier && (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setModifier(!modifier)} className="icon-add"/>
                          <UpdateSection  id={props.id} />
                      </div>
                      )  
                  }

                    <AfficheSession id={props.id}/>

                    {
                      session && (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setSession(!session)} className="icon-add"/>
                          <AddSession  id={props.id} />
                      </div>
                      )  
                  }
                    <div className='btn-add-session' onClick={() => setSession(!session)}>
                      <p><AddCircleOutlineIcon className='icon-add' />Ajouter session</p>
                    </div>
                        
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Êtes-vous sûr de vouloir supprimer cette section ?</Modal.Body>
                        <Modal.Footer>
                          <Button className='btn-annuler' onClick={handleClose}>
                          Annuler
                          </Button>
                          <Button className="btn-confirmer" >
                          Supprimer
                          </Button>
                        </Modal.Footer>
                      </Modal>
    </div>
  )
}

export default Section