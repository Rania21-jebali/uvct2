import React from 'react'
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './AddFormation.css'


const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

function PlanifierCours() {
    const onFinish = values => {
        console.log('Received values of form:', values);
      };
  return (
    <div className='content'>
    <h3>Participants cibles</h3>
    <p className='paragraphe'>
    Les descriptions suivantes seront publiquement visibles sur la page d'accueil de votre cours <br /> et auront une incidence directe sur les performances de votre cours. <br />
    Ces descriptions aideront les participants à décider si votre cours leur convient.
    </p>
            <h5>Que vont apprendre les participants inscrits à votre cours ?</h5>
            <p className='paragraphe'>
            Vous devez saisir au moins 3 objectifs ou résultats d'apprentissage que les participants <br />sont censés atteindre après avoir suivi votre cours.
            </p>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.Item>
                    <Input placeholder="Exemple : Définir les roles et les responsabilités d'un chef de projet" style={{ width: '60%' }}/>
                </Form.Item>
                <Form.Item >
                    <Input placeholder="Exemple : Estimer les délais et budgets d'un projet" style={{ width: '60%' }}/>
                </Form.Item>
                <Form.Item >
                    <Input placeholder="Exemple : Identifier et gérer les risques liés à un projet" style={{ width: '60%' }}/>
                </Form.Item>
            <Form.List
                name="names"
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 && formItemLayoutWithOutLabel)}
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
                            message: "Please input objectif's name or delete this field.",
                            },
                        ]}
                        noStyle
                        >
                        <Input placeholder="Complétez votre réponse" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 0 ? (
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
                            Complétez votre réponse
                        </Button>
                    <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
                )}
            </Form.List>
    </Form>
    <h5>Quels sont les prérequis du cours ?</h5>
    <p className='paragraphe'>Dressez la liste des compétences, de l'expérience, des outils ou de l'équipement <br /> 
    que les participants doivent posséder pour suivre votre cours.<br />
    S'il n'y a pas de prérequis, profitez-en pour simplifier la tâche des débutants.</p>
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.Item>
                    <Input placeholder="Exemple : Aucune expérience en programmation requise." style={{ width: '60%' }}/>
                </Form.Item>
            <Form.List
                name="names"
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 && formItemLayoutWithOutLabel)}
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
                            message: "Please input objectif's name or delete this field.",
                            },
                        ]}
                        noStyle
                        >
                        <Input placeholder="Complétez votre réponse" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 0 ? (
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
                            Complétez votre réponse
                        </Button>
                    <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
                )}
            </Form.List>
    </Form>
    <h5>À qui ce cours s'adresse-t-il ?</h5>
    <p className='paragraphe'>
    Rédigez une courte description des participants cibles que le contenu de votre cours peut intéresser.<br />
    Cela vous aidera à attirer les bons participants.
    </p>
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.Item>
                    <Input placeholder="Exemple : développeurs Python débutants intéressés par la science des données" style={{ width: '60%' }}/>
                </Form.Item>
            <Form.List
                name="names"
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 && formItemLayoutWithOutLabel)}
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
                            message: "Please input objectif's name or delete this field.",
                            },
                        ]}
                        noStyle
                        >
                        <Input placeholder="Complétez votre réponse" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 0 ? (
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
                            Complétez votre réponse
                        </Button>
                    <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
                )}
            </Form.List>
    </Form>
    </div>
    
  )
}

export default PlanifierCours