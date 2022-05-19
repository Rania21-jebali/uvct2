import React ,{useState} from 'react'
import { Button , Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {fetchCategorie, dispatchGetCategorie} from '../../../redux/actions/categorieAction'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
    const categorieState = {
    titre:'',
    motCles:'',
    description:'',
    err: '',
    success: ''
    }

function UpdateCategorie(props){
    const [data, setData] = useState(categorieState)
    const {titre,motCles,description,err,success} = data
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const {id} = useParams();
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const categories = useSelector(state => state.categorie)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchCategorie(id).then(res =>{
            dispatch(dispatchGetCategorie(res))
        })
    },[id, dispatch, callback])

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
                            headers: {'content-type': 'multipart/form-data'}
                        })
              
                        setLoading(false)
                        setImage(res.data.url)
                        setOpen(true);
                        
                    } catch (err) {
                        setImage({...data, err: err.response.data.msg , success: ''})
                        setOpen1(true);
                    }
                  }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updateCategorie/${id}`, {
                       titre: titre ? titre : categories.titre,
                       motCles: motCles ? motCles : categories.motCles,
                       description: description ? description : categories.description,

                    })
                    setData({...data, err: '' , success: "Success!"})
                    setOpen(true);
                  
               } catch (err) {
                    setData({...data, err: err.response.data.msg , success: ''})
                    setOpen1(true);
                }
              }
      
              const handleUpdate = () => {
                  updateInfor()
              }
console.log(data.titre)
    return(
        <div className='add-admin'>
      <BreadcrumbHeader item="Liste des catégories" link="/categories" active="Modifier catégorie"/>
        <div className='content-admin'>
            <Form className='form-admin'>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du catégorie</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="titre"
                    required 
                    defaultValue={categories.titre}
                    onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Mot clés</Form.Label>
                    <Form.Control type="text" 
                    placeholder="mot clés" 
                    name="motCles"
                    required 
                    defaultValue={categories.motCles}
                    onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du catégorie</Form.Label>
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
                    <Form.Control type="text" 
                    placeholder="Enter description" 
                    name="description"
                    required 
                    defaultValue={categories.description}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Modifier catégorie</Button>
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

export default UpdateCategorie