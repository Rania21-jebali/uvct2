import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {Form, Input} from 'antd';
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import axios from 'axios'
import './Categories.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const initialState = {
    titre:'',
    err: '',
    success: ''
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

function AddCategorie() {
    const token = useSelector(state => state.token)
    const [categorie, setCategorie] = useState(initialState)
    const {titre, err, success} = categorie
    
    const [fileList, setFileList] = useState([]);
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
    
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
  return (
    <div className='add-admin'>
    <BreadcrumbHeader item="Liste des catégories" link="/categories" active="Ajouter catégorie"/>
      <div className='content-admin'>
        <Form name="dynamic_form_item" onSubmit={handleSubmit} className='form-admin'  {...layout}>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                 <Form.Item name='titre' label="Nom de catégorie"
                     value={titre} 
                     onChange={handleChangeInput} 
                      required>
                   <Input placeholder="Catégorie..." style={{ width: '60%' }} />
                  </Form.Item>
                  <Form.Item name='titre' label="Mots clés"
                        value={titre}
                        onChange={handleChangeInput} 
                        required>
                   <Input placeholder="mots clés" style={{ width: '60%' }} />
                  </Form.Item>
                  <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                    >
                        <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>
                    </ImgCrop>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea style={{ width: '60%' }}/>
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
                                <Input placeholder="sous-catégorie..." style={{ width: '60%'}}
                                className={`${fields.length > 1? "addSousCatg":"" }`} />
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
                                onClick={() => add()}
                                style={{ width: '60%',marginLeft:'300px'}}
                                className='btn-confirmer'
                            >
                             <PlusOutlined />   Ajouter sous-catégorie
                            </Button>
                            <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                    <div className='ctn-btn-admin'>
                        <Button  className='btn-annuler' size="lg" >
                            Annuler
                        </Button>
                        <Button  className='btn-confirmer' type="submit" size="lg" >
                            confirmer
                        </Button>
            </div>
                </Form>
                </div>
    </div>
  )
}

export default AddCategorie