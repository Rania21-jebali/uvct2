import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchEvents, dispatchGetEvents} from '../../../../redux/actions/eventsAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../../redux/actions/usersAction'
import Avatar1 from '../../../../components/Avatar/Avatar';
import { Modal} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import { Input} from 'antd';
import { List } from 'antd';
import DayJS from 'react-dayjs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateIcon from '@material-ui/icons/Create';

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
  
  function TousEvent() {
  const token = useSelector(state => state.token)
  const events = useSelector(state => state.events)
  const [event, setEvent ]= useState(initialState);
  const [callback, setCallback] = useState(false)
  const { err, success} = event
  const onSearch = value => console.log(value);
  const dispatch = useDispatch()

    useEffect(() => {
            fetchEvents(token).then(res =>{
                dispatch(dispatchGetEvents(res))
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
          field: 'titre',
          headerName: 'Titre',
          flex:1,
        },
        { 
          headerName: 'Instructeur',
          flex:2,
          renderCell: (params) =>{
            function Instructeur1(instructeur){
                const users1 = useSelector(state => state.users)
                const [callback1, setCallback1] = useState(false)
                const dispatch1 = useDispatch()
                useEffect(() => {
                    fetchUserById(instructeur).then(res =>{
                          dispatch1(dispatchGetAllUserById(res))
                      })
                },[dispatch1,instructeur, callback1])
                return users1
            }
            return(
              <> 
              <div className='userList'>
                <Avatar1 src={Instructeur1(params.row.instructeur).avatar}/>
                {Instructeur1(params.row.instructeur).name}
              </div>
              </>
            )
          }
        },
        {
          field: 'prix',
          headerName: 'Prix',
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
            field: 'action',
            headerName: 'Action',
            flex:1,
            renderCell: (params) =>{
              return(
                <>
                    <VisibilityIcon  className='icon-visible'/>
                    <CreateIcon className='icon-visible'/>
                    <DescriptionIcon onClick={showModal} className='icon-visible'/>
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
        prix:event?.prix,
        instructeur:event?.postedBy,
        date:event?.dateDebut,
    }
})
  return (
<>
<div style={{ height: 550, width: '100%'}}>
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
          avatar={<Avatar1 src="https://joeschmoe.io/api/v1/random" />}
          title={item.title}
          description={item.date}

        />
      </List.Item>
    )}
  />
      </Modal>
</>
     
  )
}

export default TousEvent