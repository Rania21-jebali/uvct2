import React ,{useState} from 'react'
import { Accordion, Button , Form} from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import '../AddFormation.css'
import UpdateSession from './UpdateSession';


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

function Session(props) {
    const [description, setDescription] = useState(false)
    const [contenu, setContenu] = useState(false)
    const [edit1, setEdit1] = useState(false)
    const [modifier, setModifier] = useState(false)


  return (
    <div>
    {console.log(props.titre)}
    {
                      modifier ? (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setModifier(!modifier)} className="icon-add"/>
                          <UpdateSession  id={props.id} />
                      </div>
                      )  :
                      (
                        <Accordion>
             <Accordion.Item eventKey={props.num}>
                <Accordion.Header>
                <div  onMouseEnter={() => setEdit1(true)}  onMouseLeave={() => setEdit1(false)}>
                    <div>
                    <CheckCircleIcon />{props.titre} :{
                            edit1 && (
                                <>
                                <EditIcon className="icon-prog" onClick={() => setModifier(true)}/> 
                                <DeleteOutlineIcon className="icon-prog" />
                                </>
                            )
                        }
                        </div>
                </div>
                </Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
                      )
                  }
        
    </div>
  )
}

export default Session