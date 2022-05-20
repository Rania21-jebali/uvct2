import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {isEmpty} from '../../../components/utils/validation/Validation'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Form, Spinner } from 'react-bootstrap'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import { useParams } from 'react-router-dom'

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const initialState = {
    titre: '',
    image:'',
    description:'',
    motCles:'',
    err: '',
    success: ''
  }

function AddSousCategorie() {
    const [data, setData] =useState(initialState);
    const {titre,description,motCles, err, success} = data
    const token = useSelector(state => state.token)
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const {id} = useParams()

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
        setData({...data, [name]:value, err: '', success: ''})
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
            setImage(res.data.url)
            setOpen(true);
            
        } catch (err) {
            setImage({...data, err: err.response.data.msg , success: ''})
            setOpen1(true);
        }
      }
    
      const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(titre) || isEmpty(description) || isEmpty(motCles))
                return setData({...data, err: "Please fill in all fields.", success: ''})
  
        try {
            const res = await axios.post(`/addsousCateg/${id}`, {
              titre, description, image, motCles
            })
  
            setData({...data, err: '', success: res.data.msg})
            setOpen(true);
  
        } catch (err) {
            err.response.data.msg && 
            setData({...data, err: err.response.data.msg, success: ''})
            setOpen1(true);
        }
      }
      
  return (
    <div className='add-admin'>
      <BreadcrumbHeader item="Liste des sous catégories" link={`/categorie/sousCategories/${id}`} active="Ajouter sous catégorie"/>
        <div className='content-admin'>
          <Form onSubmit={handleSubmit} className='form-admin'>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Titre</Form.Label>
                  <Form.Control type="text" placeholder="Exemple: Dévéloppement web" 
                    name="titre" 
                    value={titre}
                    onChange={handleChangeInput} 
                    required 
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Mot clés</Form.Label>
                  <Form.Control type="text" placeholder="Citez mots clés de catégories" 
                    name="motCles" 
                    value={motCles}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du sous-catégorie</Form.Label>
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
                <img src={image} alt="" className="affiche-img"></img>
              <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                onChange={changeAffiche}
                style={{display:"none"}}
              />
              </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Description</Form.Label>
                  <Form.Control type="text" placeholder="description" 
                    name="description" 
                    value={description}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <div className='ctn-btn-admin'>
            <Button  className='btn-annuler' size="lg" >
                Annuler
            </Button>
            <Button  className='btn-confirmer' type="submit" size="lg" >
                confirmer
            </Button>
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
    </div>
  )
}

export default AddSousCategorie