import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import './AddFormation.css'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'


const initialState = {
    objectif:'',
    prerequis:'',
    destinerA:'',
    err: '',
    success: ''
  }
  
function PlanifierCours() {
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    const {objectif,prerequis,destinerA, err, success} = data
    const {titre1} = useParams();
    const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()

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
                     destinerA : destinerA ? destinerA : formations.destinerA,
                     
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
    <div className='content'>
          {err && ShowErrMsg(err)}
          {success && ShowSuccessMsg(success)}
            <h3>Participants cibles</h3>
            <p className='paragraphe'>
            Les descriptions suivantes seront publiquement visibles sur la page d'accueil de votre cours <br /> et auront une incidence directe sur les performances de votre cours. <br />
            Ces descriptions aideront les participants à décider si votre cours leur convient.
            </p>
            <h5>Que vont apprendre les participants inscrits à votre cours ?</h5>
            <p className='paragraphe'>
            Vous devez saisir au moins 3 objectifs ou résultats d'apprentissage que les participants <br />sont censés atteindre après avoir suivi votre cours.
            </p>
            <Form className='publier-content'>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" 
                        name="objectif"
                        placeholder="Exemple : Définir les roles et les responsabilités d'un chef de projet" 
                        style={{ width: '80%' }}
                        onChange={handleChange}
                        defaultValue={formations.objectif}
                        required 
                    />
                </Form.Group>
            <h5>Quels sont les prérequis du cours ?</h5>
            <p className='paragraphe'>Dressez la liste des compétences, de l'expérience, des outils ou de l'équipement <br /> 
            que les participants doivent posséder pour suivre votre cours.<br />
            S'il n'y a pas de prérequis, profitez-en pour simplifier la tâche des débutants.</p>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" 
                        name="prerequis"
                        placeholder="Exemple : Aucune expérience en programmation requise." 
                        style={{ width: '80%' }}
                        onChange={handleChange}
                        defaultValue={formations.prerequis}
                        required 
                    />
                </Form.Group>
        <h5>À qui ce cours s'adresse-t-il ?</h5>
        <p className='paragraphe'>
        Rédigez une courte description des participants cibles que le contenu de votre cours peut intéresser.<br />
        Cela vous aidera à attirer les bons participants.
        </p>
            <Form.Group className="mb-3" >
                  <Form.Control type="text" 
                    name="destinerA"
                    placeholder="Exemple : développeurs Python débutants intéressés par la science des données" 
                    style={{ width: '80%' }}
                    onChange={handleChange}
                    defaultValue={formations.destinerA}
                    required 
                  />
            </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Confirmer</Button>
          </div>
        </Form>
    </div> 
  )
}

export default PlanifierCours