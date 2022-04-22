import React ,{useState} from 'react'
import { Button, Form ,Modal} from 'react-bootstrap'
import { Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"

const { Search } = Input;
const onSearch = value => console.log(value);

const columns = [
  {
    field: 'photo',
    headerName: 'Miniature',
    flex:1,
  },
  {
    field: 'titre',
    headerName: 'Titre',
    flex:1,
  },
  {
    field: 'date',
    headerName: 'Date de création',
    flex:1,
  },
  {
    field: 'ventes',
    headerName: 'Ventes',
    flex:1,
  },
  {
    field: 'inscription',
    headerName: 'Inscriptions',
    flex:1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex:1,
  },
  {
      field: 'action',
      headerName: 'Action',
      flex:1,
      renderCell: (params) =>{
        return(
          <> 
              <img src="images/trash.png" alt="" className='icon-action'/>    
          </>
        )
      }
    },
];
const rowData=[];

function Formations() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='formation'>
      <div className='formTitleContainer'>
        <h1 className="title-event">Mes formations</h1>
        <Button className='btn-event' onClick={handleShow}>
         <img src="images/add-square.png" alt="" className='img-btn'/>Formation</Button>
      </div>
      <div className="search">
      <Search placeholder="Rechercher des formations" allowClear onSearch={onSearch}  />
      </div>
          <div style={{ height: 550, width: '100%',background:"white",marginTop:"20px"}} >
            <DataGrid
                    rows={rowData}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    disableSelectionOnClick
                  />
          </div>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
          <Modal.Title>Nommez votre formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Quel nom désirez-vous donner à votre formation ?</p>
          <Form>
            <Form.Group className="mb-3" >
             <Form.Control type="text" 
              placeholder="par exemple “Stratégies marketing avancées”"
              name="titre"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <a href="/new-formation">
          <Button className='btn-confirme' onClick={handleClose}>
            Continuer
          </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Formations