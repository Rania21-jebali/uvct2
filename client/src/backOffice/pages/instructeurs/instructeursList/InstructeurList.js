import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllInstr, dispatchGetAllInstr} from '../../../../redux/actions/usersAction'
import axios from 'axios'
import Avatar1 from '../../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../../components/table/Table';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';

const { confirm } = Modal;

function InstructeurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin } = auth
    const users1 = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const {err} = data
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
    
      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        
      const handleClose1 = () => {
          setAnchorEl(null);
        };

      useEffect(() => {
        if(isAdmin|| isSuperAdmin ){
              fetchAllInstr(token).then(res =>{
                  dispatch(dispatchGetAllInstr(res))
              })
         }},[token,isAdmin, isSuperAdmin, dispatch, callback])

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
              setOpen2(true)
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
            headerName: 'T??l??phone',
            flex:1,
          },
        {
          field: 'date',
          headerName: 'Date cr??ation',
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
                    <p className='p-admin'>BLOQU??</p>:
                    <p className='p-admin'>ACTIV??</p> 
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
                  title: '??tes-vous s??r de vouloir supprimer ce compte apprenant?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Supprimer',
                  okType: 'danger',
                  cancelText: 'Annuler',
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
                 <a href={`/instructeur/${params.row.id}`}>
                 <VisibilityIcon className='icon-action'/>
                 </a>
                    <Button aria-describedby={id} className="btn-action" onClick={handleClick}>???</Button>
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
                            <Nav.Link className="actionNav">Bloqu?? instructeur</Nav.Link>
                            <Divider />
                            <Nav.Link className="actionNav" onClick={showDeleteConfirm}>Supprimer instructeur</Nav.Link>
                        </Popover> 
                </>
              )
            }
          },
      ];
    const rowData= users1?.map(user => {
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
    <div style={{ height: 550, width: '100%' }} >
      <Table row={rowData} columns={columns}/>
      <SnackbarErr err={err} open2={open2}/>
    </div>  
  )
}

export default InstructeurList