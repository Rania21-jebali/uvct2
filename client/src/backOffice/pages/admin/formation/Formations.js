import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import Formation from './Formation'
function Formations1() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h3 className="title-event">Mes formations</h3>
      </div>
      <div className="scrollTab">
     <ScrollTab label1="Formations" label2="Archives" 
        item1={<Formation />}
    />
    </div>
    </div>
  )
}

export default Formations1