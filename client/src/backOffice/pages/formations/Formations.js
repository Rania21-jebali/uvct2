import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyFormations, dispatchGetMyFormations} from '../../../redux/actions/formationsAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import { Button,Form ,Modal,Nav} from 'react-bootstrap'
import {Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import { useNavigate } from 'react-router-dom';
import DayJS from 'react-dayjs';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { Search } = Input;
const onSearch = value => console.log(value);
const initialState = {
  titre:'',
  err: '',
  success: ''
}
function Formations() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id= open ? 'simple-popover' : undefined;
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
  const [currentRow, setCurrentRow] = useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);


        const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        };

        const handleClose3 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen3(false);
          };

        const handleClick = (event) => {
                setAnchorEl(event.currentTarget);
        };

        const handleClose1 = () => {
                setAnchorEl(null);
        };

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
                  navigate(`/test/${formation.titre}`);
                  setOpen2(true);

              } catch (err) {
                  err.response.data.msg && 
                  setFormation({...formation, err: err.response.data.msg, success: ''})
                  setOpen3(true);
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
              setFormation({...formation, err: err.response.data.msg , success: ''})
              setOpen3(true);
          }
          } 

        const columns = [
          {
            field: 'affiche',
            headerName: 'Miniature',
            flex:1,
            renderCell: (params) =>{
              return(
                <> 
                    <img src={params.row.affiche} alt="" className='miniature'/>    
                </>
              )
            }
          },
          {
            field: 'titre',
            headerName: 'Titre',
            flex:2,
          },
          {
            field: 'date',
            headerName: 'Date de création',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
                
              );
            }
          },
          {
            field: 'prix',
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
            sorting:false,
            renderCell: (params) =>{
              return(
                <div className={`${params.row.status ? "status-formation1" : "status-formation2"}`}> 
                {
                  params.row.status ? 
                  <p className='p-formation'>PUBLIÉ</p> :
                  <p className='p-formation'>INÉDIT</p>
                }
                </div>
              )
            }
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{
                return(
                  <> 
                  {console.log(currentRow)}
                  <a href={`/maFormation/${params.row.titre}`}><img src="images/eye.png" alt="" className='icon-visible'/></a>
                  <Button aria-describedby={id} className="btn-action" onClick={handleClick}>⋮</Button>
                    <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose1}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                        <Nav.Link className="actionNav">Dépublier formation</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" onClick={() => handleDelete(currentRow.id)}>Supprimer formation</Nav.Link>
                    </Popover>     
                  </>
                )
              }
            },
        ];

        const data= formations?.map(formation => {
          return{
              id:formation?._id,
              titre:formation?.titre,
              prix:formation?.prix,
              affiche:formation?.affiche,
              status:formation?.status,
              date:formation?.createdAt,
              inscription:0,
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
          <div style={{ height: 550}} className="tableau" >
            <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={8}
                    isRowSelectable={(params) => setCurrentRow(params.row)}
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
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose2} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose3} severity="error">
                {err}
                </Alert>
            </Snackbar>
    </div>
  )
}

export default Formations