import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllInstr, dispatchGetAllInstr} from '../../redux/actions/usersAction'
import VisibilityIcon from '@material-ui/icons/Visibility';
import './Candidature.css'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import DayJS from 'react-dayjs';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
function Candidature() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth
    const users = useSelector(state => state.users)

    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdmin){
            fetchAllInstr(token).then(res =>{
                dispatch(dispatchGetAllInstr(res))
            })

        }
    },[token, isAdmin, dispatch, callback])
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
      field: 'name',
      headerName: 'Candidat',
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
          return(
            <>
            
             <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Voir détails</Tooltip>}>
          <Link to={"/candidat/"+params.row.id}>
          <VisibilityIcon className='visibilityListIcon' size="10rem"/>
          </Link>
          </OverlayTrigger>
          <Button className="acceptIcon">Accepter</Button>    
          <Button className='refuserIcon' onClick={() => handleDelete(params.row.id)}>Refuser</Button>          
      
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
        specialite:user?.specialite,
        date:user?.createdAt
    }
})
  
  const [data, setData] =useState([]);
  console.log(rowData);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (

     <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        components={{
         Toolbar: CustomToolbar,
  }}    
      />
    </div> 
  )
}

export default Candidature