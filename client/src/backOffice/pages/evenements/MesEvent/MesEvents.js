import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchMyEvents, dispatchGetMyEvents} from '../../../../redux/actions/eventsAction'
import { Modal} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import { Input, Button} from 'antd';
import { List, Avatar } from 'antd';
import DayJS from 'react-dayjs';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListIcon from '@material-ui/icons/List';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

const initialState = {
  err: '',
  success: ''
}

const { Search } = Input;
const participants = [
    { 
      title: 'Phillip Baptista',
      date:'14 avril, 20:21'
    },
    {   
        title: 'Phillip Baptista',
        date:'14 avril, 20:21'

      },
    
  ];
  const onSearch = value => console.log(value);
  
function MesEvents() {
  const auth = useSelector(state => state.auth)
  const {isInstr} = auth
  const token = useSelector(state => state.token)
  const events = useSelector(state => state.events)
  const [event, setEvent ]= useState(initialState);
  const [callback, setCallback] = useState(false)
  const { err, success} = event

    const dispatch = useDispatch()
    useEffect(() => {
            fetchMyEvents(token).then(res =>{
                dispatch(dispatchGetMyEvents(res))
            })
    },[token, dispatch, callback])

    const handleDelete = async (id) => {
      try {
          if(event._id !== id){
                  await axios.delete(`/deleteEvent/${id}`, {
                      headers: {Authorization: token}
                  })
                 
                  setCallback(!callback)
          }
          
      } catch (err) {
              setEvent({...event, err: err.response.data.msg, success: ''})
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
          field: 'date',
          headerName: 'Date',
          flex:2,
          renderCell(params){
            return(
              <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
            );
          }
        },
        {
          field: 'participant',
          headerName: 'Participants',
          flex:2,
          renderCell(params){
            return(
              <ListIcon onClick={showModal} className='icon-action'/>
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
                 <a href={`/events/${params.row.id}`}>
                         <VisibilityIcon className='icon-action'/>
                  </a>
                    <ArchiveIcon className='icon-action'/>
                    <DeleteOutlineIcon onClick={() => handleDelete(params.row.id)} className="icon-delete"/>
                </>
              )
            }
          },
      ];
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const rowData= events?.map(event => {
    return{
        id:event?._id,
        titre:event?.titre,
        affiche:event?.affiche,
        date:event?.dateDebut,
    }
})

  return (
<div className={`${isInstr ? "favoris":""} `}>
{
      isInstr && (
        <div className='formTitleContainer'>
        <h3 className="title-event">Mes événements</h3>
        <Button  href="/ajout-evenement">
         <AddIcon />Ajouter événement</Button>
      </div>
      )
    }
  <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
      <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick 
            />
  </div> 
<Modal title="Participants" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
<Search placeholder="Rechercher des participants" allowClear onSearch={onSearch}  />
<List
    dataSource={participants}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item.title}
          description={item.date}
        />
      </List.Item>
    )}
  />
      </Modal>
</div>
     
  )
}

export default MesEvents