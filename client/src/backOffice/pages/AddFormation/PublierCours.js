import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import { Button, Form, Spinner } from 'react-bootstrap'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';
import { useParams } from 'react-router-dom'
import './AddFormation.css'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialState = {
  titre:'',
  sousTitre:'',
  description:'',
  affiche:'',
  videopromo:'',
  prix:'',
  categorie:'',
  niveau:'',
  err: '',
  success: ''
}

function PublierCours() {
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    const {sousTitre,description,prix,categorie,niveau, err, success} = data
    const {titre1} = useParams();
    const [gratuit, setGratuit] = useState(false);
    const [affiche, setAffiche] = useState(false);
    const [loading, setLoading] = useState(false);
    const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
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
          console.log(formations.titre)

        const handleChange = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        }

        const changeAffiche = async(e) => {
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
              const res = await axios.post('/api/uploadAffiche', formData, {
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setAffiche(res.data.url)
              setOpen(true);
              
          } catch (err) {
              setAffiche({...data, err: err.response.data.msg , success: ''})
              setOpen1(true);
          }
        }

        const updateInfor = async() => {
          try {
            if(data.titre !== titre1){
              axios.patch(`/updateFormation/${titre1}`, {
                sousTitre: sousTitre ? sousTitre : formations.sousTitre,
                 description: description ? description : formations.description,
                   prix : prix ? prix : formations.prix, 
                   categorie : categorie ? categorie : formations.categorie,
                   niveau : niveau ? niveau : formations.niveau ,
                   gratuit : gratuit ? gratuit : formations.gratuit, 
                   affiche ,
              }, { headers: {Authorization: token} })
              setData({...data, err: '' , success: "Success!"})
            }
         } catch (err) {
              setData({...data, err: err.response.data.msg , success: ''})
          }
        }

        const handleUpdate = () => {
            updateInfor()
        }
  return (
    <div className="publier">
        <h5>Page d'accueil du cours</h5>
        <Form >
          {err && ShowErrMsg(err)}
          {success && ShowSuccessMsg(success)}
            <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du cours</Form.Label>
                  <Form.Control type="text" 
                  defaultValue={titre1}
                  name="titre"
                  disabled
                  style={{ width: '500px' }}
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Sous-titre du cours</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Saisissez le sous-titre de votre cours." 
                    name="sousTitre"
                    onChange={handleChange}
                    defaultValue={formations.sousTitre}
                    required 
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="label">Description du cours</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder="Saisissez la description de votre cours." 
                name="description" 
                onChange={handleChange}
                defaultValue={formations.description}
                required 
              />
            </Form.Group>
              <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du cours</Form.Label>
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
                <img src={affiche ? 
                affiche 
                : formations.affiche} alt="" className="affiche-img"></img>
              <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                onChange={changeAffiche}
                style={{display:"none"}}
              />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Vidéo promotionnelle</Form.Label>
                <div className="content-affiche">
                  <Form.Label htmlFor="file" > 
                  <p> <MovieIcon /> Séléctionnez un vidéo </p>
                  </Form.Label>
                  </div>
                <Form.Control type="file" id="file"
                    style={{display:"none"}}
              />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Catégorie</Form.Label>
                <Form.Select 
                    required 
                    name="categorie"
                    onChange={handleChange}
                    placeholder="Saisissez " 
                    >
                    <option defaultValue="--Séléctionner la catégorie--">--Séléctionner la catégorie--</option>
                    <option value="développement web">développement web</option>
                    <option value="développement mobile">développement mobile</option>
                    <option value="développement personnel">développement personnel</option>
                    <option value="design">design</option>
                    <option value="business">business</option>
                    <option value="design">design</option>
                    <option value="communication">communication</option>
                    <option value="photographie">photographie</option>
                    <option value="mode de vie">design</option>
                    <option value="musique">musique</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Niveau</Form.Label>
                <Form.Select 
                    required 
                    name="niveau"
                    onChange={handleChange}
                    >
                    <option defaultValue="--Séléctionner le niveau--">--Séléctionner le niveau--</option>
                    <option value="Niveau Débutant">Niveau Débutant</option>
                    <option value="Niveau intermédiaire">Niveau intermédiaire</option>
                    <option value="Niveau Confirmé">Niveau Confirmé</option>
                    <option value="Tous les niveaux">Tous les niveaux</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Gratuit"
                defaultValue={formations.gratuit}
                onChange={(e) => setGratuit(e.target.checked)}
              />
              </Form.Label>
                <Form.Control type="number"
                placeholder="0,000 Dt"
                name="prix"
                defaultValue={formations.prix}
                onChange={handleChange}
                />
              </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' disabled={loading} onClick={handleUpdate}>Confirmer</Button>
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

export default PublierCours