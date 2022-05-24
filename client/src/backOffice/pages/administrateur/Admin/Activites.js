import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchHistoryByAdmin, dispatchHistoryByAdmin} from '../../../../redux/actions/historyAction'
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios'
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useParams} from 'react-router-dom'
import Avatar1 from '../../../../components/Avatar/Avatar';
import { fetchUserById ,dispatchGetAllUserById} from '../../../../redux/actions/usersAction';

const { confirm } = Modal;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initialState = {
  name: '',
  email:'',
  tele:'',
  password:'',
  err: '',
  success: ''
}

function  Activities() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user} = auth
    const histories1 = useSelector(state => state.histories)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState(initialState);
    const {err} =data
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
    const {id} = useParams()
    const rowData= histories1?.map(history => {
      return{
          id:history?._id,
          idAdmin:history?.idAdmin,
          action1:history?.action,
          user:history?.Useremail,
          date:history?.createdAt,
      }
    })
    
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen2(false);
    };

      useEffect(() => {
        fetchHistoryByAdmin(id).then(res =>{
                dispatch(dispatchHistoryByAdmin(res))
            })
      },[id, dispatch, callback])

    const handleDelete = async (id) => {
      try {
          if(user._id !== id){
                  await axios.delete(`/deleteHistory/${id}`, {
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
          field: 'idAdmin',
          headerName: 'Admin',
          flex:2,
          renderCell: (params) =>{
            function Instructeur(instructeur){
                const users = useSelector(state => state.users)
                const [callback1, setCallback1] = useState(false)
                const dispatch1 = useDispatch()
                useEffect(() => {
                    fetchUserById(instructeur).then(res =>{
                          dispatch1(dispatchGetAllUserById(res))
                      })
                },[dispatch1,instructeur, callback1])
                return users
            }
            return(
              <> 
              <div className='userList'>
                <Avatar1 src={Instructeur(params.row.idAdmin).avatar}/>
                {Instructeur(params.row.idAdmin).name}
              </div>
              </>
            )
          }
        },
        {
          field: 'action1',
          headerName: 'Action',
          flex:2,
        },
        {
          field: 'user',
          headerName: 'Utilisateur',
          flex:2,
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
                <DeleteOutlineIcon onClick={showDeleteConfirm} className="icon-delete"/>
                </>
              )
            }
          },
      ];

  return (
        <div style={{ height: 550}}>
            <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose2} severity="error">
                {err}
                </Alert>
        </Snackbar>
        </div>
  )
}

export default Activities