import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllInstr, dispatchGetAllInstr} from '../../../../redux/actions/usersAction'
import axios from 'axios'
import Avatar1 from '../../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Button,Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'

function InstructeurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose1 = () => {
        setAnchorEl(null);
      };
    useEffect(() => {
        if(isSuperAdmin){
            fetchAllInstr(token).then(res =>{
                dispatch(dispatchGetAllInstr(res))
            })

        }
    },[token, isSuperAdmin, dispatch, callback])

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
        field: 'statut',
        headerName: 'Statut',
        flex:1,
        renderCell: (params) =>{
            return(
              <div className={`${params.row.status ? "status-admin2" : "status-admin1"}`}> 
              {
                params.row.status ? 
                <p className='p-admin'>BLOQUÉ</p>:
                <p className='p-admin'>ACTIVÉ</p> 
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
            <img src="images/eye.png" alt=""/>
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
                        <Nav.Link className="actionNav">Bloqué instructeur</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" >Supprimer instructeur</Nav.Link>
                    </Popover> 
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
    }
})
   //Supprimer instructeur
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  const [data, setData] =useState([]);
  console.log(rowData);
  
  return (
<div style={{ height: 550, width: '100%' }}  >
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        
      />
    </div> 
    
  )
}



export default InstructeurList