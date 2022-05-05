import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchCategories, dispatchCategories} from '../../../redux/actions/categorieAction'
import {fetchSousCategorie, dispatchSousCategorie} from '../../../redux/actions/sousCategorieAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import DayJS from 'react-dayjs';
import {DataGrid} from '@mui/x-data-grid';
import { Modal,Form, Input, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Categories.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const initialState = {
    titre:'',
    err: '',
    success: ''
  }

function Categories() {
    const token = useSelector(state => state.token)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categorie, setCategorie] = useState(initialState)
    const categories1 = useSelector(state => state.categorie)
    const sousCategories1 = useSelector(state => state.sousCategories)
    const {titre, err, success} = categorie
    const [callback, setCallback] = useState(false)
    const [callback1, setCallback1] = useState(false)
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    var id = categories1._id

        useEffect(() => {
            fetchCategories(token).then(res =>{
                  dispatch(dispatchCategories(res))
              })
        },[token, dispatch, callback])

        useEffect(() => {
            fetchSousCategorie(token,id).then(res =>{
                  dispatch1(dispatchSousCategorie(res))
              })
        },[token,id, dispatch1, callback1])

        const handleChangeInput = e => {
            const {name, value} = e.target
            setCategorie({...categorie, [name]:value, err: '', success: ''})
        }
        
        const handleSubmit = async e => {
            e.preventDefault()
            try {
                const res = await axios.post('/ajoutcateg', {
                  titre
                },{
                  headers: {Authorization: token}
              })
                setCategorie({...categorie, err: '', success: res.data.msg})
  
            } catch (err) {
                err.response.data.msg && 
                setCategorie({...categorie, err: err.response.data.msg, success: ''})
            }
          }

        const onFinish = values => {
            console.log('Received values of form:', values);
        };

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            handleSubmit()
           setIsModalVisible(false);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };

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
            /*souscategories:sousCategories1?.map(sousCat => {

            }*/
        }
    })
    
  return (
      <div className='admin'>
        <div className="header-admin">
            <h1 className='title-admin'>Liste des catégories</h1>
            <Button className='btn-add-categorie' onClick={showModal}>
             <img src="images/add-square.png" className="add-icon" alt="" />Catégorie
            </Button>
            <Modal title="Ajouter une nouvelle catégorie" visible={isModalVisible} 
            onOk={handleOk} onCancel={handleCancel} okText="Confirmer" cancelText="Annuler">
                <Form name="dynamic_form_item" >
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                 <Form.Item name='catégorie' label="Nom de catégorie">
                   <Input placeholder="Catégorie..." style={{ width: '60%' }}
                        value={titre}
                        onChange={handleChangeInput} 
                        required
                   />
                  </Form.Item>
                    <Form.List name="names">
                        {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Les sous catégories' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input passenger's name or delete this field.",
                                    },
                                ]}
                                noStyle
                                >
                                <Input placeholder="sous-catégorie..." style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                                ) : null}
                            </Form.Item>
                            ))}
                            <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Ajouter sous-catégorie
                            </Button>
                            <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                </Form>
           </Modal>
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