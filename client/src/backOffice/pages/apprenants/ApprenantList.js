import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Modal,Button,FloatingLabel,Form,OverlayTrigger,Tooltip} from 'react-bootstrap';
import './Apprenants.css'

function ApprenantList() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.users)

    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdmin || isSuperAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })

        }
    },[token,isAdmin, isSuperAdmin, dispatch, callback])
   
    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                   
                    setCallback(!callback)
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
  const columns = [
    {
      field: 'avatar',
      headerName: 'Nom',
      flex:2,
      renderCell(params){
        return(
            <div className='userList'>
            <Avatar1 src={params.row.avatar}/>
            {params.row.name}
            </div>
        );
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      flex:2,
    },
    {
        field: 'tele',
        headerName: 'Téléphone',
        flex:1,
      },
    {
      field: 'date',
      headerName: 'Date création',
      flex:2,
      renderCell(params){
        return(
          <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
        );
      }
    },
    {
        field: 'action',
        headerName: 'Action',
        flex:1,
        renderCell: (params) =>{
          return(
            <>
          <VisibilityIcon className='visibilityListIcon'/>
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Supprimer apprenant</Tooltip>}>
          <img src="images/trash.png" className="add-icon" alt="" onClick={handleShow} />
          </OverlayTrigger>
          <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer apprenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label >Cause</Form.Label>
        <FloatingLabel controlId="floatingTextarea2" label="Cause">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
    />
  </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button className='annulerButton' onClick={handleClose}>
            Annuler
          </Button>
          <Button className='supprimerButton' onClick={() => handleDelete(params.row.id)}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
            </>
          )
        }
      },
  ];
const rowData= users?.map(user => {
    return{
        id:user?._id,
        name:user?.name,
        email:user?.email,
        avatar:user?.avatar,
        date:user?.createdAt,
        tele:user?.tele,
    }
})
   //Supprimer apprenant
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  const [data, setData] =useState([]);
  console.log(rowData);
  return (
      <div className="apprenat-list">
      <h1 className='title-apprenant'>Liste apprenants</h1>
          <div style={{ height: 550, width: '100%',backgroundColor:'white' }}  >
            <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={8}
                checkboxSelection
                disableSelectionOnClick
            />
    </div> 
      </div>
  )
}

export default ApprenantList