import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {ShowSuccessMsg, ShowErrMsg} from '../../../components/utils/notifications/Nofification'
import {Form, Input} from 'antd';
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import axios from 'axios'
import './Categories.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';

const initialState = {
    titre:'',
    err: '',
    success: ''
  }

function AddCategorie() {
    const token = useSelector(state => state.token)
    const [categorie, setCategorie] = useState(initialState)
    const {titre, err, success} = categorie

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
    <BreadcrumbHeader item="Administrateur" link="administrateurs" active="Ajouter Administrateur"/>
      <div className='content-admin'>
        <Form name="dynamic_form_item" onSubmit={handleSubmit} className='form-admin'>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                 <Form.Item name='titre' label="Nom de catégorie"
                 value={titre}
                        onChange={handleChangeInput} 
                        required>
                   <Input placeholder="Catégorie..." style={{ width: '60%' }}
                        
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
                    <Button type="submit">
                         Sauvegarder
                    </Button>
                </Form>
                </div>
    </div>
  )
}

export default AddCategorie