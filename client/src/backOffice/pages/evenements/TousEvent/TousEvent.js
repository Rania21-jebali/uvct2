import React, { useState } from 'react';
import { Modal} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import { Input} from 'antd';
import { List, Avatar } from 'antd';

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
  const rowData = [
    { id:"1",
     titre: 'Selling from a to z', 
     date:"mercredi 27 avril 2022, 17:00 jusqu'au mercredi 27 avril 2022, 19:00",
  },
  { id:"2",
    titre: 'Selling from a to z', 
    date:"mercredi 27 avril 2022, 17:00 jusqu'au mercredi 27 avril 2022, 19:00",
 }
  ];
 

  const onSearch = value => console.log(value);

function TousEvent() {
    const columns = [
        {
          field: 'titre',
          headerName: 'Titre',
          flex:1,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex:3,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex:1,
            renderCell: (params) =>{
              return(
                <>
                    <img src="images/edit.png" alt="" className='icon-action'/> 
                    <img src="images/eye.png" alt="" className='icon-action' /> 
                    <img src="images/List-participants.png" alt="" className='icon-action' onClick={showModal}/> 
                    <img src="images/trash.png" alt="" className='icon-action'/>    
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
  const [data, setData] =React.useState(rowData);

  return (
<>
<div style={{ height: 550, width: '100%'}}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        checkboxSelection
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
</>
     
  )
}

export default TousEvent