import React ,{useState, useEffect} from 'react'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import {fetchChapitres, dispatchChapitres} from '../../../redux/actions/chapitreAction'
import { Collapse } from 'antd';
import { Button , Form } from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {  Modal} from 'antd';

const { confirm } = Modal;
const { Panel } = Collapse;

    function callback1(key) {
    console.log(key);
    }

    const initialState = {
    titre:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }
    
    function AddSection(){
        const chapitres = useSelector(state => state.chapitres)
        const [chapitre, setChapitre] = useState(initialState)
        const {formation,objectif,titre, err, success} = chapitre
        const formations = useSelector(state => state.formations)
        const token = useSelector(state => state.token)
        const [callback, setCallback] = useState(false)
        const [callback2, setCallback2] = useState(false)
        const dispatch = useDispatch()
        const dispatch2 = useDispatch()
        const {titre1} = useParams();
        var id = formations._id
      
              useEffect(() => {
                fetchFormation(token,titre1).then(res =>{
                      dispatch(dispatchGetFormation(res))
                  })
                },[token,titre1, dispatch, callback])
                
                useEffect(() => {
                  fetchChapitres(token,id).then(res =>{
                        dispatch2(dispatchChapitres(res))
                    })
                },[token, id ,dispatch2, callback2])

                const handleChangeInput = e => {
                    const {name, value} = e.target
                    setChapitre({...chapitre, [name]:value, err: '', success: ''})
                  }

                const handleSubmit = async (e,titre1) => {
                    e.preventDefault()
                    try {
                    if(formations.titre !== titre1){
                        const res = await axios.post(`/ajoutchap/${formations.titre}`,
                        {titre, objectif, formation: formations._id}, {headers: {Authorization: token}
                    })
                        setChapitre({...chapitre, err: '', success: res.data.msg})
            
                } } catch (err) { 
                    err.response.data.msg &&
                    setChapitre({...chapitre, err: err.response.data.msg, success: ''})
                    }
                }

        return(
            <div className='content-chapitre'>
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
          </div>
        )
    }
 
    function AfficheSection(){
        const token = useSelector(state => state.token)
        const formations = useSelector(state => state.formations)
        const chapitres = useSelector(state => state.chapitres)
        const [edit, setEdit] = useState(false)
        const [edit1, setEdit1] = useState(false)
        const [callback, setCallback] = useState(false)
        const [callback2, setCallback2] = useState(false)
        const [chapitre, setChapitre] = useState(initialState)
        const [callback3, setCallback3] = useState(false)
        const dispatch = useDispatch()
        const dispatch2 = useDispatch()
        const {titre1} = useParams();
        var id = formations._id

            useEffect(() => {
            fetchFormation(token,titre1).then(res =>{
                    dispatch(dispatchGetFormation(res))
                })
            },[token,titre1, dispatch, callback])
            
            useEffect(() => {
                fetchChapitres(token,id).then(res =>{
                    dispatch2(dispatchChapitres(res))
                })
            },[token, id ,dispatch2, callback2])
           
            const handleDelete = async (id) => {
                try {
                    if(chapitre._id !== id){
                            await axios.delete(`/deleteChapitre/${id}`, {
                                headers: {Authorization: token}
                            })
                            setCallback3(!callback3)
                    }
                  }   catch (err) {
                    setChapitre({...chapitre, err: err.response.data.msg , success: ''})
                }
                } 

            function showDeleteConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir supprimer ce compte apprenant?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Supprimer',
                      okType: 'danger',
                      cancelText: 'Annuler',
                      closable:true,
                      onOk() {
                        handleDelete(chapitre._id)
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                }

            const genExtra = () => (
                    <Button className='btn-annnuler'><AddIcon />Contenu</Button>
                );

            const getHeader = () => (
                      <div  onMouseEnter={() => setEdit1(true)}  onMouseLeave={() => setEdit1(false)}>
                          <h5>
                          <CheckCircleIcon />Session 1 :{
                                edit1 && (
                                    <>
                                    <EditIcon className="icon-prog"/> 
                                    <DeleteOutlineIcon className="icon-prog" />
                                    </>
                                )
                            }
                            </h5>
                      </div>
                    );

        return(
            <div>
                {
          chapitres.map(chapitre => 
          (
          <div className='content-chapitre' >
                <h5 onMouseEnter={() => setEdit(true)}  onMouseLeave={() => setEdit(false)}>
                <DescriptionIcon className="icon-prog"/>{chapitre.titre} : {edit && (<><EditIcon className="icon-prog"/> 
                <DeleteOutlineIcon className="icon-prog" onClick={showDeleteConfirm}/></>)}</h5>
          <div>
            <Collapse  onChange={callback1}>
                <Panel header={getHeader()} extra={genExtra()} >
                  
                </Panel>
            </Collapse>
            <div className='btn-add-session'>
            <p><AddCircleOutlineIcon className='icon-add'/>Ajouter session</p>
            </div>
            </div>
          </div> 
          
        ))
      }
            </div>
        )
    }

function Programme() {
    const [show, setShow] = useState(true);
    const token = useSelector(state => state.token)
    const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const [callback2, setCallback2] = useState(false)
    const dispatch = useDispatch()
    const dispatch2 = useDispatch()
    const {titre1} = useParams();
    var id = formations._id

        useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])
          
          useEffect(() => {
            fetchChapitres(token,id).then(res =>{
                  dispatch2(dispatchChapitres(res))
              })
          },[token, id ,dispatch2, callback2])    

  return (
    <div>
        <h3>Programme</h3>
        <p className='paragraphe'>Pour donner forme à votre cours, créez des sections,
         des sessions  et des exercices pratiques <br />(quiz, exercices de codage et exercices).</p>
        <p className='paragraphe'>Si vous prévoyez de rendre votre cours gratuit,
        la longueur totale de son contenu vidéo doit être inférieure à 2 heures.</p>
        <Button className='btn-confirme' onClick={() => setShow(!show)} ><AddIcon />Ajouter section</Button>
         <AfficheSection />
        {
          !show && <AddSection className="icon-prog"/>
        } 
    </div>
  )
}

export default Programme