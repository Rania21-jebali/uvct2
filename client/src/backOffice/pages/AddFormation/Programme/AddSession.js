import React ,{useState, useEffect} from 'react'
import { Button , Form } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import '../AddFormation.css'
import { dispatchGetSection, fetchSection } from '../../../../redux/actions/sectionAction'

    const sessionState = {
      titre:'',
      section:'',
      err: '',
      success: ''
      }
    

      function AddSession(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState)
        const {titre} = session
        const idS=props.id

          const handleChangeInput = e => {
            const {name, value} = e.target
            setSession({...session, [name]:value, err: '', success: ''})
          }

        const handleSubmit = async (e,idS) => {
            e.preventDefault()
            try {  if(idS !== props.id){
                const res = await axios.post("/ajoutSession",
                {titre, section: props.id }, {headers: {Authorization: token}
            })
                setSession({...session, err: '', success: res.data.msg})
            }  
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

export default AddSession