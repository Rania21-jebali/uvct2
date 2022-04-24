import React , { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from 'antd';
import { Button , Form } from 'react-bootstrap'

import '../../Formation.css'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

export default function Curriculum() {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [checked, setChecked] = React.useState([0]);

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
        <Button className='btn-event'  onClick={() => setShow(!show)}>Nouveau chapitre</Button>
      {
        show ? 
        (
          <div className='content-chapitre'>
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="Chapitre 1" key="1">
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
                          <img src="images/tick-circle.png" alt="" className='icon-action'/> 
                          <img src="images/trash.png" alt="" className='icon-action'/> 
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
          )
        : 
        (
          <div className='content-chapitre'>
          <Form>
          <Form.Group className="mb-3" >
             <Form.Label className="label">Titre du chapitre</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter un titre" 
              name="titre"
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
    <div >
  </div>
      </div>
 )
}