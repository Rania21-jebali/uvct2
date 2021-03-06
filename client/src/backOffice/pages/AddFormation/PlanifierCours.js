import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import './AddFormation.css'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../components/Snackbar/SnackbarErr'

const initialState = {
    objectif:'',
    prerequis:'',
    intendedFor:'',
    err: '',
    success: ''
  }
  
function PlanifierCours() {
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    const {objectif,prerequis,intendedFor, err, success} = data
    const {titre1} = useParams();
    const formations = useSelector(state => state.formations)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

        useEffect(() => {
            fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
            },[token,titre1, dispatch, callback])

        const handleChange = e => {
                const {name, value} = e.target
                setData({...data, [name]:value, err:'', success: ''})
        }

        const updateInfor = async() => {
            try {
              if(data.titre !== titre1){
                axios.patch(`/updateFormation/${titre1}`, {
                     objectif: objectif ? objectif : formations.objectif,
                     prerequis : prerequis ? prerequis : formations.prerequis, 
                     intendedFor : intendedFor ? intendedFor : formations.intendedFor,
                     
                }, { headers: {Authorization: token} })
                setData({...data, err: '' , success: "Success!"})
                setOpen(true);
              }
           } catch (err) {
                setData({...data, err: err.response.data.msg , success: ''})
                setOpen2(true);
            }
          }
  
        const handleUpdate = () => {
              updateInfor() 
        }
          
  return (
    <div className='content'>
      <>
        <h3>Participants cibles</h3>
        <span className='paragraphe'>
            Les descriptions suivantes seront publiquement visibles sur la page d'accueil de votre cours <br /> et auront une incidence directe sur les performances de votre cours. <br />
            Ces descriptions aideront les participants ?? d??cider si votre cours leur convient.
        </span>
        <h5>Que vont apprendre les participants inscrits ?? votre cours ?</h5>
        <span className='paragraphe'>
            Vous devez saisir au moins 3 objectifs ou r??sultats d'apprentissage que les participants <br />sont cens??s atteindre apr??s avoir suivi votre cours.
        </span>
      </>
      <Form className='publier-content'>
         <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="objectif"
              placeholder="Exemple : D??finir les roles et les responsabilit??s d'un chef de projet" 
              style={{ width: '80%' }}
              onChange={handleChange}
              defaultValue={formations.objectif}
              required 
            />
          </Form.Group>
          <>
            <h5>Quels sont les pr??requis du cours ?</h5>
            <span className='paragraphe'>Dressez la liste des comp??tences, de l'exp??rience, des outils ou de l'??quipement <br /> 
            que les participants doivent poss??der pour suivre votre cours.<br />
            S'il n'y a pas de pr??requis, profitez-en pour simplifier la t??che des d??butants.</span>
          </>
          <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="prerequis"
              placeholder="Exemple : Aucune exp??rience en programmation requise." 
              style={{ width: '80%' }}
              onChange={handleChange}
              defaultValue={formations.prerequis}
              required 
            />
          </Form.Group>
          <>
            <h5>?? qui ce cours s'adresse-t-il ?</h5>
            <span className='paragraphe'>
            R??digez une courte description des participants cibles que le contenu de votre cours peut int??resser.<br />
            Cela vous aidera ?? attirer les bons participants.
            </span>
          </>
          <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="intendedFor"
              placeholder="Exemple : d??veloppeurs Python d??butants int??ress??s par la science des donn??es" 
              style={{ width: '80%' }}
              onChange={handleChange}
              defaultValue={formations.intendedFor}
              required 
            />
          </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Confirmer</Button>
            </div>
      </Form>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
    </div> 
  )
}

export default PlanifierCours