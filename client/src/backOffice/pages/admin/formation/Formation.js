import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormations, dispatchGetFormations} from '../../../../redux/actions/formationsAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../../redux/actions/usersAction'
import Avatar1 from '../../../../components/Avatar/Avatar';
import {Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import DayJS from 'react-dayjs';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { Search } = Input;
const onSearch = value => console.log(value);
const initialState = {
  err: '',
  success: ''
}
function Formation() {
  const [formation, setFormation] = useState(initialState)
  const formations = useSelector(state => state.formations)
  const { err, success} = formation
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

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
      
        useEffect(() => {
                  fetchFormations().then(res =>{
                        dispatch(dispatchGetFormations(res))
                    })
        },[dispatch, callback])

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
              flex:1,
              renderCell: (params) =>{
                return(
                  <>  
                  <VisibilityIcon className='icon-visible'/>  
                  <DeleteOutlineIcon className="icon-delete"/> 
                  </>
                )
              }
            },
        ];

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

  return (
    <div className='formation'>
      <div className='formTitleContainer'>
        <h1 className="title-event">Liste des formations</h1>
      </div>
      <div className="search">
      <Search placeholder="Rechercher des formations" allowClear onSearch={onSearch}  />
      </div>
          <div style={{ height: 550}} className="tableau" >
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

export default Formation