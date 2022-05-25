import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchCoupons, dispatchCoupons} from '../../../../../../redux/actions/couponAction'
import {fetchFormation, dispatchGetFormation} from '../../../../../../redux/actions/formationsAction'
import {DataGrid} from '@mui/x-data-grid';
import DayJS from 'react-dayjs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const initialState = {
     code:'', 
     nbRemise:'',
     remise:'',
     dateDebut:'',
     dateFin:'',
     err: '',
     success: ''
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function AllCoupons() {
    const token = useSelector(state => state.token)
    const coupons = useSelector(state => state.coupons)
    const formations = useSelector(state => state.formations)
    const [coupon, setCoupon ]= useState(initialState);
    const [callback, setCallback] = useState(false)
    const [callback1, setCallback1] = useState(false)
    const { err, success} = coupon
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    const {titre1} = useParams()
    const rowData= coupons?.map(coupon => {
        return{
            id:coupon?._id,
            code:coupon?.code,
            remise:coupon?.remise,
            dateFin:coupon?.dateFin,
            nbRemise:coupon?.nbRemise,
            statut:coupon?.statut,
        }
      })

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen2(false);
      };
   
      useEffect(() => {
        fetchFormation(token,titre1).then(res =>{
            dispatch1(dispatchGetFormation(res))
        })
    },[token,titre1,dispatch1, callback1])

      useEffect(() => {
        fetchCoupons(token,formations._id).then(res =>{
            dispatch(dispatchCoupons(res))
        })
    },[token,formations._id,dispatch, callback])
     
      const handleDelete = async (id) => {
        try {
            if(coupon._id !== id){
                    await axios.delete(`/deleteCoupon/${id}`, {
                        headers: {Authorization: token}
                    })
                  
                    setCallback(!callback)
                    setOpen(true);
            }
            
        } catch (err) {
                setCoupon({...coupon, err: err.response.data.msg, success: ''})
                setOpen2(true);
        }
      } 
  
      const columns = [
          {
            field: 'code',
            headerName: 'Code',
            flex:1,
          },
          {
            field: 'remise',
            headerName: 'Remise',
            flex:1,
          },
          {
            field: 'nbRemise',
            headerName: 'Copons Restants',
            flex:2,
          },
          {
            field: 'dateFin',
            headerName: 'Expire',
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
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{
                function showDeleteConfirm() {
                  confirm({
                    title: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
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
                    <a href={`/coupon/${params.row.id}`}>
                          <VisibilityIcon className='icon-action'/>
                    </a>
                      <DeleteOutlineIcon onClick={showDeleteConfirm} className="icon-delete"/>
                  </>
                )
              }
            },
        ];

  return (
  <div style={{ height: 550, width: '100%' , backgroundColor:'white', marginTop:'20px'}}>
      <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick 
            />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose2} severity="error">
          {err}
        </Alert>
      </Snackbar>
</div>
     
  )
}

export default AllCoupons