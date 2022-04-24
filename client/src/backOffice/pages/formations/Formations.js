import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyFormations, dispatchGetMyFormations} from '../../../redux/actions/formationsAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import { Button, Form ,Modal} from 'react-bootstrap'
import { Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const onSearch = value => console.log(value);
const initialState = {
  titre:'',
  err: '',
  success: ''
}
function Formations() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useSelector(state => state.token)
  const [formation, setFormation] = useState(initialState)
  const formations = useSelector(state => state.formations)
  const {titre, err, success} = formation
  const navigate = useNavigate();
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()

        useEffect(() => {
              fetchMyFormations(token).then(res =>{
                    dispatch(dispatchGetMyFormations(res))
                })
        },[token, dispatch, callback])

          const handleChangeInput = e => {
            const {name, value} = e.target
            setFormation({...formation, [name]:value, err: '', success: ''})
        }

        const handleSubmit = async e => {
          e.preventDefault()
          try {
              const res = await axios.post('/addFormation', {
                titre
              },{
                headers: {Authorization: token}
            })
              setFormation({...formation, err: '', success: res.data.msg})
              navigate(`/new-formation/${formation.titre}`);

          } catch (err) {
              err.response.data.msg && 
              setFormation({...formation, err: err.response.data.msg, success: ''})
          }
        }

        const handleDelete = async (id) => {
          try {
              if(formation._id !== id){
                      await axios.delete(`/deleteFormation/${id}`, {
                          headers: {Authorization: token}
                      })
                    
                      setCallback(!callback)
              }
            }   catch (err) {
              setFormation({...data, err: err.response.data.msg , success: ''})
          }
          } 

        const columns = [
          {
            field: 'photo',
            headerName: 'Miniature',
            flex:1,
          },
          {
            field: 'titre',
            headerName: 'Titre',
            flex:1,
          },
          {
            field: 'date',
            headerName: 'Date de création',
            flex:1,
          },
          {
            field: 'ventes',
            headerName: 'Ventes',
            flex:1,
          },
          {
            field: 'inscription',
            headerName: 'Inscriptions',
            flex:1,
          },
          {
            field: 'status',
            headerName: 'Status',
            flex:1,
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{
                return(
                  <> 
                      <img src="images/trash.png" alt="" className='icon-action' onClick={() => handleDelete(params.row.id)}/>    
                  </>
                )
              }
            },
        ];

        const data= formations?.map(formation => {
          return{
              id:formation?._id,
              titre:formation?.titre,
          }
        })

  return (
    <div className='formation'>
      <div className='formTitleContainer'>
        <h1 className="title-event">Mes formations</h1>
        <Button className='btn-event' onClick={handleShow}>
         <img src="images/add-square.png" alt="" className='img-btn'/>Formation</Button>
      </div>
      <div className="search">
      <Search placeholder="Rechercher des formations" allowClear onSearch={onSearch}  />
      </div>
          <div style={{ height: 550, width: '100%',background:"white",marginTop:"20px"}} >
            <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    disableSelectionOnClick
                  />
          </div>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
          <Modal.Title>Nommez votre formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {err && ShowErrMsg(err)}
            {success && ShowSuccessMsg(success)}
        <p>Quel nom désirez-vous donner à votre formation ?</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
             <Form.Control type="text" 
              placeholder="par exemple “Stratégies marketing avancées”"
              name="titre"
              value={titre}
              onChange={handleChangeInput} 
              required
              />
            </Form.Group>
            <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <Button className='btn-confirme' type="submit">
            Continuer
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Formations