import React ,{useState, useEffect} from 'react'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import {fetchSections, dispatchSections ,fetchSection, dispatchGetSection} from '../../../redux/actions/sectionAction'
import {fetchSessions, dispatchSessions} from '../../../redux/actions/sessionAction'
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
import CloseIcon from '@material-ui/icons/Close';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
const { confirm } = Modal;
const { Panel } = Collapse;

    const sectionState = {
    titre:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

    const sessionState = {
      titre:'',
      section:'',
      err: '',
      success: ''
      }
    
    function AddSection(){
        const [section, setSection] = useState(sectionState)
        const {objectif,titre} = section
        const formations = useSelector(state => state.formations)
        const token = useSelector(state => state.token)
        const [callback, setCallback] = useState(false)
        const dispatch = useDispatch()
        const {titre1} = useParams();
      
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
            
                } } catch (err) { 
                    err.response.data.msg &&
                    setSection({...section, err: err.response.data.msg, success: ''})
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
          </>
        )
    }

    function AddSession(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState)
        const {titre} = session

          const handleChangeInput = e => {
            const {name, value} = e.target
            setSession({...session, [name]:value, err: '', success: ''})
          }

        const handleSubmit = async (e,idSect) => {
            e.preventDefault()
            try { 
                const res = await axios.post("/ajoutSession",
                {titre, section: props.id }, {headers: {Authorization: token}
            })
                setSession({...session, err: '', success: res.data.msg})
              
              }
          catch (err) { 
            err.response.data.msg &&
            setSession({...session, err: err.response.data.msg, success: ''})
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
        </div>
      )
    }

    function AddDescription(){
      return(
        <div>
                <Form >
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Description de la session</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Ajouter une description.Mentionnez ce que les participants seront capables de faire une fois la session" 
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Sauvegarder</Button>
                </div>
              </Form>
                </div>
      )
    }

    function AddVideo(){
      return(
        <div>
                <Form >
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Télécharger vidéo :</Form.Label>
                        <Form.Control type="file" 
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Sauvegarder</Button>
                </div>
              </Form>
                </div>
      )
    }

    function AddMulti(){
      return(
        <div>
                <Form >
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Choisissez une vidéo :</Form.Label>
                        <Form.Control type="file" 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Choisissez une présentation :</Form.Label>
                        <Form.Control type="file" 
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Sauvegarder</Button>
                </div>
              </Form>
                </div>
      )
    }

    function AddArticle(){
      return(
        <div>
                <Form >
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Texte</Form.Label>
                        <Form.Control type="text" 
                          placeholder="Ecrire text..." 
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Sauvegarder</Button>
                </div>
              </Form>
                </div>
      )
    }

    function AddContenu(){
      const [video, setVideo] = useState(false)
      const [article, setArticle] = useState(false)
      const [multi, setMulti] = useState(false)

      return(
        <div>
      <h5>Sélectionner le type de contenu</h5>
      <p>Sélectionner le type principal de contenu. Des fichiers et des liens peuvent
      <br /> être ajoutés en tant que ressources.</p>
      {
        (!video && !multi && !article) &&
        (
          <div className='content-type'>
            <div className='type-content' onClick={ () => setVideo(!video)}>
              <PlayCircleOutlineIcon /><p>Vidéo</p>
            </div>
            <div className='type-content' onClick={ () => setMulti(!multi)}>
              <p>Support:<br /> Vidéo et <br />diapositives</p>
            </div>
            <div className='type-content' onClick={ () => setArticle(!article)}>
              <DescriptionIcon /><p>Article</p>
            </div>
          </div>
        )
      }
      
      {
        video && 
        (<div className='content-chapitre'>
                  <CloseIcon onClick={ () => setVideo(!video)} className="icon-add"/>
                    <AddVideo />
                </div>
                  )
      }
      {
        multi && 
        (<div className='content-chapitre'>
                  <CloseIcon onClick={ () => setMulti(!multi)} className="icon-add"/>
                    <AddMulti />
                </div>
                  )
      }
      {
        article && 
        (<div className='content-chapitre'>
                  <CloseIcon onClick={ () => setArticle(!article)} className="icon-add"/>
                    <AddArticle />
                </div>
                  )
      }
        </div>
      )
    }

    function AfficheSession(props){
      const token = useSelector(state => state.token)
        const [description, setDescription] = useState(false)
        const [contenu, setContenu] = useState(false)
        const [session, setSession] = useState(false)
        const [edit1, setEdit1] = useState(false)
        const sessions = useSelector(state => state.sessions)
        const [callback, setCallback] = useState(false)
        const dispatch = useDispatch()
        const id2=props.id

        useEffect(() => {
          fetchSessions(token,props.id).then(res =>{
              dispatch(dispatchSessions(res))
          })
        },[token, props.id ,dispatch, callback])

        const getHeader = (session) => (
          <div  onMouseEnter={() => setEdit1(true)}  onMouseLeave={() => setEdit1(false)}>
              <h5>
              <CheckCircleIcon />{session.titre} :{
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
          sessions.map(session => 
          (
            <Collapse>
                <Panel header={getHeader(session)} >
                
                { (!description && !contenu) && (
                  <>
                  <Button className='btn-annnuler' onClick={ () => setDescription(!description)}>
                  <AddIcon />Description</Button>
                  <Button className='btn-annnuler' onClick={() => setContenu(!contenu)}>
                  <AddIcon />Contenu</Button>
                  </>
                 )
                }
                { description && 
                (<div className='content-chapitre'>
                  <CloseIcon onClick={ () => setDescription(!description)} className="icon-add"/>
                    <AddDescription />
                </div>
                  )}
                {
                  contenu && (<div className='content-chapitre'>
                  <CloseIcon onClick={ () => setContenu(!contenu)} className="icon-add"/>
                    <AddContenu />
                </div>
                  )
                }
                </Panel>
            </Collapse>
            ))}
            </div>
          
      )
    }

    function AfficheSection(){
        const token = useSelector(state => state.token)
        const formations = useSelector(state => state.formations)
        const sections = useSelector(state => state.sections)
        const [session, setSession] = useState(false)
        const [edit, setEdit] = useState(false)
        const [callback, setCallback] = useState(false)
        const [callback2, setCallback2] = useState(false)
        const [section, setSection] = useState(sectionState)
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
                fetchSections(token,id).then(res =>{
                    dispatch2(dispatchSections(res))
                })
            },[token, id ,dispatch2, callback2])
           
            const handleDelete = async (id) => {
                try {
                    if(section._id !== id){
                            await axios.delete(`/deleteSection/${id}`, {
                                headers: {Authorization: token}
                            })
                            setCallback3(!callback3)
                    }
                  }   catch (err) {
                    setSection({...section, err: err.response.data.msg , success: ''})
                }
                } 

            function showDeleteConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir supprimer cette section?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Supprimer',
                      okType: 'danger',
                      cancelText: 'Annuler',
                      closable:true,
                      onOk() {
                        handleDelete(section._id)
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                }
            
            return(
              <div>
                {
                sections.map((section) => 
                (
                  <div className='content-chapitre' >
                        <h5 onMouseEnter={() => setEdit(true)}  onMouseLeave={() => setEdit(false)}>
                        Section 1 :  
                        <DescriptionIcon className="icon-prog"/>
                        {section.titre}{edit && (<><EditIcon className="icon-prog"/> 
                        <DeleteOutlineIcon className="icon-prog" onClick={showDeleteConfirm}/></>)}</h5>
                        <AfficheSession id={section._id}/>
                        {
                          session && (
                          <div className='content-chapitre'>
                            <CloseIcon onClick={() => setSession(!session)} className="icon-add"/>
                              <AddSession id={section._id} />
                          </div>
                          )  
                      }
                    <div className='btn-add-session' onClick={() => setSession(!session)}>
                      <p><AddCircleOutlineIcon className='icon-add' />Ajouter session</p>
                    </div>
                  </div> 
                ))
               }
           </div>)
          }

function Programme() {
    const [show, setShow] = useState(true);

  return (
    <div>
        <h3>Programme</h3>
        <p className='paragraphe'>Pour donner forme à votre cours, créez des sections,
         des sessions  et des exercices pratiques <br />(quiz, exercices de codage et exercices).</p>
        <p className='paragraphe'>Si vous prévoyez de rendre votre cours gratuit,
        la longueur totale de son contenu vidéo doit être inférieure à 2 heures.</p>
         <AfficheSection />
        {
          !show && (
            <div className='content-chapitre'>
              <CloseIcon onClick={ () => setShow(!show)} className="icon-add"/>
              <AddSection className="icon-prog"/>
            </div>
          )} 
        <Button className='btn-confirme' onClick={() => setShow(!show)} ><AddIcon />Ajouter section</Button>
    </div>
  )
}

export default Programme