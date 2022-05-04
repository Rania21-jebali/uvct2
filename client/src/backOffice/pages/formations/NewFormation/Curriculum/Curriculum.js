import React ,{useState, useEffect} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import {fetchFormation, dispatchGetFormation} from '../../../../../redux/actions/formationsAction'
import {fetchChapitres, dispatchChapitres} from '../../../../../redux/actions/chapitreAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../../components/utils/notifications/Nofification'
import { Collapse } from 'antd';
import { Button , Form } from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import '../../Formation.css'

const { Panel } = Collapse;

function callback1(key) {
  console.log(key);
}

const initialState = {
  titre:'',
  formation:'',
  err: '',
  success: ''
}

export default function Curriculum() {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [showFile, setShowFile] = useState(true);
  const [showText, setShowText] = useState(true);
  const [showQuest, setShowQuest] = useState(true);
  const [checked, setChecked] = React.useState([0]);
  const [chapitre, setChapitre] = useState(initialState)
  const {formation,titre, err, success} = chapitre
  const token = useSelector(state => state.token)
  const formations = useSelector(state => state.formations)
  const chapitres = useSelector(state => state.chapitres)
  const [callback, setCallback] = useState(false)
  const [callback2, setCallback2] = useState(false)
  const dispatch = useDispatch()
  const dispatch2 = useDispatch()
  const {titre1} = useParams();
  var id = formations._id

        useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])
          
          useEffect(() => {
            fetchChapitres(token,id).then(res =>{
                  dispatch2(dispatchChapitres(res))
              })
          },[token, id ,dispatch2, callback2])

      const handleChangeInput = e => {
        const {name, value} = e.target
        setChapitre({...chapitre, [name]:value, err: '', success: ''})
      }

      const handleSubmit = async (e,titre1) => {
        e.preventDefault()
        try {
          if(formations.titre !== titre1){
            const res = await axios.post(`/ajoutchap/${formations.titre}`,
            {titre, formation: formations._id}, {headers: {Authorization: token}
          })
            setChapitre({...chapitre, err: '', success: res.data.msg})
            window.location.reload(false);

      } } catch (err) { 
          err.response.data.msg &&
          setChapitre({...chapitre, err: err.response.data.msg, success: ''})
        }
      }
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };

    return(
      <div className="coupon">
      {
        show2 ?
       (<>
        <Button className='btn-event'  onClick={() => setShow(!show)}>Nouveau chapitre</Button>
      {
        show ? 
        ( 
          chapitres.map(chapitre => 
          (
          <div className='content-chapitre'>
              <Collapse  onChange={callback1}>
                <Panel header={chapitre.titre} >
                  <List>
                    <ListItem key="1" role={undefined} dense button onClick={handleToggle("1")}>
                      <ListItemIcon>
                        <Checkbox
                        edge="start"
                        checked={checked.indexOf("1") !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': "1" }}
                        />
                      </ListItemIcon>
                      <ListItemText id="1" primary="Leçon 1">
                        <img src="images/trash.png" alt="" /> 
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <img src="/images/tick-circle.png" alt="" className='icon-action'/> 
                          <img src="/images/trash.png" alt="" className='icon-action'/> 
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                      <Button className='btn-add-lecon' onClick={() => setShow2(!show2)}>
                        Ajouter une nouvelle leçon
                      </Button>
                  </List>
                </Panel>
            </Collapse>
          </div> 
        )))
        : 
        (
          <div className='content-chapitre'>
                <Form onSubmit={handleSubmit}>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <Form.Group className="mb-3" >
                  <Form.Label className="label">Titre du chapitre</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="titre"
                    value={titre}
                    onChange={handleChangeInput} 
                    required 
                    />
                </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Sauvgarder</Button>
                </div>
              </Form>
          </div>
          )
      }
      
       </>

       )
        :
        (
          <>
            <div className="btn-group">
             <Button className="btn-lecon" onClick={() => setShowFile(!showFile)}>Ajouter le fichier </Button>
             <Button className="btn-lecon" onClick={() => setShowText(!showText)}>Ajouter du text </Button>
             <Button className="btn-lecon" onClick={() => setShowQuest(!showQuest)}>Ajouter un questionnaire </Button>
            </div>
            {
              showFile ?
                (<div className="content-lecon">
                <h5>Téléchargeur de fichiers</h5>
                <p>Utilisez le téléchargeur de fichiers pour télécharger des fichiers vidéo, audio, PDF ou tout autre fichier dans votre cours.</p>
                </div>
                )

              :
              (<>
                {
                  showText ?
                  (<h5>Text</h5>)
                  :
                  <h5>questionnaire</h5>
                }
                </>
                )
                
            }
          </>
        )
      }
       
    <div >
  </div>
      </div>
 )}