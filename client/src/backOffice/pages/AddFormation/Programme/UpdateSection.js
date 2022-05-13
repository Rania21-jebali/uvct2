import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import '../AddFormation.css'
import { dispatchGetSection, fetchSection } from '../../../../redux/actions/sectionAction'
import { useEffect } from 'react'

    const sectionState = {
    titre:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function UpdateSection(props){
    const [section, setSection] = useState(sectionState)
    const {objectif,titre} = section
    const sections5 = useSelector(state => state.sections)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = props.id
        
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
      </>
    )
}

export default UpdateSection