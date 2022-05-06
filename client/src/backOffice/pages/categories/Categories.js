import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchCategories, dispatchCategories} from '../../../redux/actions/categorieAction'
import {fetchSousCategorie, dispatchSousCategorie} from '../../../redux/actions/sousCategorieAction'
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Categories.css'

const { confirm } = Modal;
const initialState = {
    titre:'',
    err: '',
    success: ''
  }

function Categories() {
    const token = useSelector(state => state.token)
    const [categorie, setCategorie] = useState(initialState)
    const categories1 = useSelector(state => state.categorie)
    const sousCategories1 = useSelector(state => state.sousCategories)
    const [callback, setCallback] = useState(false)
    const [callback1, setCallback1] = useState(false)
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    var id = categorie._id
       
        //Catégories
        useEffect(() => {
            fetchCategories(token).then(res =>{
                  dispatch(dispatchCategories(res))
              })
        },[token, dispatch, callback])

        //Sous catégorie
        useEffect(() => {
          fetchSousCategorie(token,id).then(res =>{
                dispatch1(dispatchSousCategorie(res))
            })
        },[token,id, dispatch1, callback1])
       

       const handleDelete = async (id) => {
        try {
            if(categorie._id !== id){
                    await axios.delete(`/deleteCategorie/${id}`, {
                        headers: {Authorization: token}
                    })
                    
                    setCallback(!callback)
            }
        } catch (err) {
            setCategorie({...categorie, err: err.response.data.msg , success: ''})
        }
        }

        //Sous catégorie
        useEffect(() => {
            fetchSousCategorie(token,id).then(res =>{
                  dispatch1(dispatchSousCategorie(res))
              })
        },[token,id, dispatch1, callback1])

    const columns = [
        {
          field: 'titre',
          headerName: 'Catégorie',
          flex:1,
        },
        {
            field: 'souscategories',
            headerName: 'Sous-catégories',
            flex:2,
            renderCell(params){
              
              return(
                <>
                   {
                    sousCategories1?.map(sousCategories => (
                                        <td>{sousCategories?.titre}</td>
                                           
                    ))
                   }
                </>
              );
            }
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
            field: 'action',
            headerName: 'Action',
            flex:1,
            renderCell: (params) =>{
              function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Supprimer',
                  okType: 'danger',
                  cancelText: 'Annuler',
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
                 <img src="images/edit.png" className="add-icon" alt="" />
                 <img src="images/trash.png" className="add-icon" alt="" onClick={showDeleteConfirm}/>
                </>
              )
            }
          },
      ];
     const rowData= categories1?.map(categorie => {
        return{
            id:categorie?._id,
            titre:categorie?.titre,
            date:categorie?.createdAt,
        }
    })
    
  return (
      <div className='admin'>
        <div className="header-admin">
            <h1 className='title-admin'>Liste des catégories</h1>
            <Button className='btn-add-categorie' href='/addcategorie'>
             <img src="images/add-square.png" className="add-icon" alt="" />Catégorie
            </Button>
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

export default Categories