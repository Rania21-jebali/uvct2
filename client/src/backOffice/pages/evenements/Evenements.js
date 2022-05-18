import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import ArchiveEvent from './ArchiveEvent/ArchiveEvent'
import './Evenements.css'
import MesEvents from './MesEvent/MesEvents'
import TousEvent from './TousEvent/TousEvent'

function Evenements() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h1 className="title-event">Mes événements</h1>
        <a href="/ajout-evenement">
        <Button className='btn-event'> <img src="images/add-square.png" alt="" className='img-btn'/>Événements</Button>
        </a>
      </div>
      <div className="scrollTab">
     <ScrollTab label1="Tous" label2="Mes événements" label3="Archive" 
        item1={<TousEvent />}
        item2={<MesEvents />}
        item3={<ArchiveEvent />}
    />
    </div>
    </div>
  )
}

export default Evenements