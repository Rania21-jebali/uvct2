import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchArchiveFormations, dispatchGetArchiveFormations} from '../../../../redux/actions/formationsAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../../redux/actions/usersAction'
import Avatar1 from '../../../../components/Avatar/Avatar';
import {Modal} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import DayJS from 'react-dayjs';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initialState = {
  err: '',
  success: ''
}

function ArchiveFormation() {
    const token = useSelector(state => state.token)
    const [formation, setFormation] = useState(initialState)
    const formations = useSelector(state => state.formations)
    const { err, success} = formation
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const data= formations?.map(formation => {
        return{
            id:formation?._id,
            titre:formation?.titre,
            affiche:formation?.affiche,
            date:formation?.createdAt,
            categorie:formation?.categorie,
            instructeur:formation?.postedBy,
            
        }
      })

        const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        };

        const handleClose3 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen3(false);
          };

        const handleDelete = async (id) => {
            try {
                if(formation._id !== id){
                        await axios.delete(`/deleteFormation/${id}`, {
                            headers: {Authorization: token}
                        })
                      
                        setCallback(!callback)
                }
                
            } catch (err) {
                setFormation({...formation, err: err.response.data.msg , success: ''})
                setOpen2(true);
            }
        }
        
        useEffect(() => {
            fetchArchiveFormations().then(res =>{
                        dispatch(dispatchGetArchiveFormations(res))
                    })
        },[dispatch, callback])

        const unarchiverFormation = async(id) => {
            try {
                axios.patch(`/unarchiveFormation/${id}`,{
                  headers: {Authorization: token}
              })
                setFormation({...formation, err: '' , success: "Formation unarchivé !"})
                setOpen2(true);
              
          }catch (err) {
                setFormation({...formation, err: err.response.data.msg , success: ''})
                setOpen3(true);
              
            }
          }

        const columns = [
          {
            field: 'affiche',
            headerName: 'Miniature',
            flex:1,
            renderCell: (params) =>{
              return(
                <> 
                    <img src={params.row.affiche} alt="" className='miniature'/>    
                </>
              )
            }
          },
          {
            field: 'titre',
            headerName: 'Titre',
            flex:1,
          },
          {
            headerName: 'Instructeur',
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
                    <Avatar1 src={Instructeur(params.row.instructeur).avatar}/>
                    {Instructeur(params.row.instructeur).name}
                  </div>
                  </>
                )
              }
          },
          {
            field: 'categorie',
            headerName: 'Catégorie',
            flex:2,
          },
          {
            field: 'date',
            headerName: 'Date de création',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
              );
            }
          },
          {
            field: 'offre',
            headerName: 'Offres',
            flex:1,
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:2,
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
                  function showUnarchiveConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir unarchiver cette formation ?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Unarchiver',
                      okType: 'danger',
                      cancelText: 'Annuler',
                      closable:true,
                      onOk() {
                        unarchiverFormation(params.row.id)
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                  }
                return(
                  <>  
                  <VisibilityIcon className='icon-action'/>  
                  <UnarchiveIcon className='icon-action'onClick={showUnarchiveConfirm}/>
                  <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm} /> 
                  </>
                )
              }
            },
        ];

  return (
    <div>
          <div style={{ height: 550, width: '100%'}} >
            <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={8}
            />
          </div>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose2} severity="success">
                    {success}
                    </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose3} severity="error">
                {err}
                </Alert>
        </Snackbar>
    </div>
  )
}

export default ArchiveFormation