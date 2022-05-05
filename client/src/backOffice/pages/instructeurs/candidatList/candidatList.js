import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCond, dispatchGetAllCond} from '../../../../redux/actions/usersAction'
import VisibilityIcon from '@material-ui/icons/Visibility';
import {OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import DayJS from 'react-dayjs';
import {isEmail} from '../../../../components/utils/validation/Validation'
import {DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { Modal } from 'antd';
import '../Instructeurs.css'

function CandidatList() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const dispatch = useDispatch()

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
                
              }  
          } catch (err) {
          setData({...data, err: err.response.data.msg , success: ''})
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
              function success() {
                Modal.success({
                  title: 'Êtes-vous sûr de vouloir accepter ce candidat?',
                  okText: 'Accepter',
                  okType: 'success',              
                  onOk() {
                    handleAccept(params.row.id) 
                  },
                });
              }
              
              function error() {
                Modal.error({
                  title: 'Êtes-vous sûr de vouloir refuser ce candidat?',
                  okText: 'Refuser',
                  okType: 'danger',              
                  onOk() {
                    handleDelete(params.row.id);
                  },
                });
              }
              
              return(
                  <div className="action-candidat">
                  <OverlayTrigger placement="bottom" 
                    overlay={<Tooltip id="button-tooltip-2">Voir détails</Tooltip>}>
                    <Link to={"/candidat/"+params.row.id}>
                      <VisibilityIcon className="icon-candidat1"/>
                    </Link>
                  </OverlayTrigger>
                  <CheckCircleOutlineIcon className="icon-candidat2" onClick={success} />
                  <CancelIcon className="icon-candidat3" onClick={error}/>      
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
            specialite:user?.specialite,
            tele:user?.tele,
            date:user?.createdAt,
        }
    })

  return (

     <div style={{ height: 550, width: '100%' }} >
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={8}
        />
      </div> 
  )
}


export default CandidatList