import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllAdmin, dispatchGetAllAdmin} from '../../../redux/actions/usersAction'
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Button,Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import './Adminstrateur.css'

function Administrateur() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {isSuperAdmin} = auth
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()

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
              return(
                <>
                <img src="images/eye.png" alt=""/>
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
                        <Nav.Link className="actionNav" >Supprimer administrateur</Nav.Link>
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
        <Button className='btn-add-admin'><img src="images/add-square.png" className="add-icon" alt=""/>Administrateur</Button>
      </div>
        <div style={{ height: 550, width: '100%' ,backgroundColor:'white'}}  >
            <DataGrid
                rows={rowData}
                columns={columns}
                pageSize={8}
                checkboxSelection
                disableSelectionOnClick
            />
        </div> 
      </div>
  )
}

export default Administrateur