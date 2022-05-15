import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import { useSelector} from 'react-redux'
import '../AddFormation.css'

    const sessionState = {
    titre:'',
    err: '',
    success: ''
    }

function UpdateSession(props){
    const [session, setSession] = useState(sessionState)
    const {titre} = session
    const token = useSelector(state => state.token)
    

                const handleChange = e => {
                    const {name, value} = e.target
                    setSession({...session, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updateSession/${props.id}`, {
                       titre: titre ? titre : session.titre,
                    }, { headers: {Authorization: token} })
                    setSession({...session, err: '' , success: "Success!"})
                  
               } catch (err) {
                    setSession({...session, err: err.response.data.msg , success: ''})
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
                    defaultValue={props.titre}
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