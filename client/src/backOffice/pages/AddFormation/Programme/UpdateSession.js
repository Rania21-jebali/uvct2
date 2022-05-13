import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import '../AddFormation.css'
import { dispatchGetSession, fetchSession } from '../../../../redux/actions/sessionAction'
import { useEffect } from 'react'

    const sessionState = {
    titre:'',
    err: '',
    success: ''
    }

function UpdateSession(props){
    const [section, setSection] = useState(sessionState)
    const {titre} = section
    const sessions = useSelector(state => state.sessions)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = props.id
        
            useEffect(() => {
                    fetchSession(token,id).then(res =>{
                        dispatch(dispatchGetSession(res))
                    })
                },[token,id, dispatch, callback])

                console.log(sessions[0].titre)

                const handleChange = e => {
                    const {name, value} = e.target
                    setSection({...section, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updateSession/${props.id}`, {
                       titre: titre ? titre : section.description,
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
                    defaultValue={sessions[0].titre}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Enregistrer la session</Button>
            </div>
          </Form>
      </>
    )
}

export default UpdateSession