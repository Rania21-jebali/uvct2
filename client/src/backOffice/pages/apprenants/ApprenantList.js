import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Apprenants.css'

const { confirm } = Modal;



function ApprenantList() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const [currentRow, setCurrentRow] = useState(null);
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
              function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer ce compte apprenant?',
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
              <VisibilityIcon className='visibilityListIcon'/>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Supprimer apprenant</Tooltip>}>
              <img src="images/trash.png" className="add-icon" alt="" onClick={showDeleteConfirm}/>
              </OverlayTrigger>
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
  return (
      <div className="apprenat-list">
        <h1 className='title-apprenant'>Liste apprenants</h1>
            <div style={{ height: 550, width: '100%',backgroundColor:'white' }}  >
              <DataGrid
                  rows={rowData}
                  columns={columns}
                  pageSize={8}
$                 isRowSelectable={(params) => setCurrentRow(params.row)}
              />
            </div> 
      </div>
  )
}

export default ApprenantList