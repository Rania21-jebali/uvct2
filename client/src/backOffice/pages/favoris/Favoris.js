import React from 'react'
import './Favoris.css'
import Table from '../../components/table/Table';

const columns = [
    {
      field: 'formation',
      headerName: 'Formation',
      flex:2,
    },
    {
      field: 'instructeur',
      headerName: 'Instructeur',
      flex:1,
    },
    {
      field: 'categorie',
      headerName: 'Catégorie',
      flex:1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex:1,
    },
    
  ];
const rowData= [];
function Favoris() {
  return (
    <div className="favoris">
    <h1 className="title-favoris1">Mes favoris</h1>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
    <Table row={rowData} columns={columns}/>
     </div> 
    </div>
  )
}

export default Favoris