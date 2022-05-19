import React from 'react'
import {DataGrid} from '@mui/x-data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const columns = [
    {
      field: 'nom',
      headerName: 'Nom',
      flex:1,
    },
    {
      field: 'cause',
      headerName: 'Cause',
      flex:1,
    },
    {
      field: 'details',
      headerName: 'Détails',
      flex:2,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex:1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex:1,
      renderCell: (params) =>{
        return(
          <>
          <a href={`/categorie/${params.row.id}`}>
             <EditIcon className='icon-visible' />
          </a>
           <DeleteOutlineIcon  className="icon-delete"/>
          </>
        )
      }
      
    },
    
  ];
const rowData= [];
function Reclamations() {
  return (
    <div className="favoris">
    <h1 className="title-favoris1">Réclamations</h1>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
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

export default Reclamations