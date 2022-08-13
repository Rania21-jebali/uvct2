import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCond, dispatchGetAllCond} from '../../../../redux/actions/usersAction'
import VisibilityIcon from '@material-ui/icons/Visibility';
import {OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import DayJS from 'react-dayjs';
import {isEmail} from '../../../../components/utils/validation/Validation'
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { Modal } from 'antd';
import '../Instructeurs.css'
import Table from '../../../components/table/Table';
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
const { confirm } = Modal;

function CandidatList() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const {success,err} = data
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
     
      useEffect(() => {
          if(isAdmin|| isSuperAdmin ){
            fetchAllCond(token).then(res =>{
                  dispatch(dispatchGetAllCond(res))
              })
          }
      },[token, isAdmin, isSuperAdmin, dispatch, callback])

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

      const handleAccept = async (id) => {
        if(!isEmail(user.email))
              return setData({...data, err: 'Invalid emails.', success: ''})
              const email=user.email
        try {
              if(user._id !== id){
                    await axios.post(`/user/acceptInstr/${id}`, {email},
                    {
                      headers: {Authorization: token}
                    })
                  setData({...data, err: '' , success: "Accept Success!"})
                  setOpen(true);
                }  
            } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            setOpen2(true);
          }
        }
     
      const columns = [
        {
          field: 'name',
          headerName: 'Nom',
          flex:1,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          flex:1,
        },
        {
            field: 'specialite',
            headerName: 'Spécialité',
            flex:1,
          },
          {
            field: 'tele',
            headerName: 'Téléphone',
            flex:1,
          },
        {
          field: 'date',
          headerName: 'Date envoi',
          flex:1,
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
              function showAccepte() {
                confirm({
                  title:'Êtes-vous sûr de vouloir accepter ce candidat?',
                  icon: <CheckCircleOutlineIcon className="iconCheck"/>,
                  okText: 'Accepter',
                  okType: 'primary',
                  cancelText: 'Annuler',
                  onOk() {
                    handleAccept(params.row.id) 
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              function showRefuse() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir refuser ce candidat?',
                  icon: <CancelIcon className="iconCancel"/>,
                  okText: 'Refuser',
                  okType: 'danger',
                  cancelText: 'Annuler',
                  onOk() {
                    handleDelete(params.row.id);
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              
              return(
                  <div className="action-candidat">
                  <OverlayTrigger placement="bottom" 
                    overlay={<Tooltip id="button-tooltip-2">Voir détails</Tooltip>}>
                    <Link to={"/candidat/"+params.row.id}>
                      <VisibilityIcon className='icon-action'/>
                    </Link>
                  </OverlayTrigger>
                  <CheckCircleOutlineIcon className="icon-candidat2" onClick={showAccepte} />
                  <CancelIcon className="icon-candidat3" onClick={showRefuse}/>      
                </div>
              )
            }
          },
      ];

      const rowData= users?.map(user => {
          return{
              id:user?._id,
              name:user?.name,
              email:user?.email,
              specialite:user?.speciality,
              tele:user?.phone,
              date:user?.createdAt,
          }
      })

  return (

      <div style={{ height: 550, width: '100%' }} >
       <Table row={rowData} columns={columns}/>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
      </div> 
  )
}


export default CandidatList