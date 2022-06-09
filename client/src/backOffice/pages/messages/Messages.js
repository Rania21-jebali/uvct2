import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import BoiteReception from './BoiteReception/BoiteReception'
import MessageEnvoyer from './MessageEnvoye/MessageEnvoyer'
import AddIcon from '@material-ui/icons/Add';

function Messages() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h1 className="title-event">Mes messages</h1>
        <a href="/">
        <Button className='btn-event'><AddIcon />Nouveau message</Button>
        </a>
      </div>
      <div className="scrollTab">
     <ScrollTab label1="Boite réception" label2="Messages envoyés" 
        item1={<BoiteReception />}
        item2={<MessageEnvoyer />}
    />
    </div>
    </div>
  )
}

export default Messages