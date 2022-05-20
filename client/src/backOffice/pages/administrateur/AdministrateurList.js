import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllAdmin, dispatchGetAllAdmin} from '../../../redux/actions/usersAction'
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Nav} from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import axios from 'axios'
import './Adminstrateur.css'
import { Button, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const { confirm } = Modal;
const initialState = {
  name: '',
  email:'',
  tele:'',
  password:'',
  err: '',
  success: ''
}

function AdministrateurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user,isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState(initialState);
    const {err} =data
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);

    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen2(false);
    };

      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

      const handleClose1 = () => {
        setAnchorEl(null);
      };

      useEffect(() => {
        if(isSuperAdmin ){
            fetchAllAdmin(token).then(res =>{
                dispatch(dispatchGetAllAdmin(res))
            })
        }
      },[token,isSuperAdmin, dispatch, callback])

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
          setOpen2(true);
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
              <DayJS format="dddd, MMMM D, YYYY h:mm A">{params.row.date}</DayJS>
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
              function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer ce compte apprenant?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Supprimer',
                  okType: 'danger',
                  cancelText: 'Annuler',
                  closable:true,
                  onOk() {
                    handleDelete(params.row.id)
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              return(
                <>
                <a href={`/admin/${params.row.id}`}>
                <VisibilityIcon className='icon-action'/>
                </a>
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
                        <Nav.Link className="actionNav">Bloqué administrateur</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" onClick={showDeleteConfirm}>Supprimer administrateur</Nav.Link>
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
            tele:user?.tele,
            date:user?.createdAt,
        }
    })

  return (
      <div className='admin'>
      <div className="header-admin">
        <h1 className='title-admin'>Liste administrateurs</h1>
          <Button className='btn-add-admin' href="/addAdmin">
            <img src="images/add-square.png" className="add-icon" alt=""/>Administrateur
          </Button>
  </div>
        <div style={{ height: 550}}  className="tableau">
            <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div> 
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose2} severity="error">
                {err}
                </Alert>
        </Snackbar>
      </div>
  )
}

export default AdministrateurList