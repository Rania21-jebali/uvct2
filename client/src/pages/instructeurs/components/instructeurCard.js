import React from 'react';
import { Card, Avatar } from 'antd';
import './instructeurCard.css'
const { Meta } = Card;

function InstructeurCard() {
  return (
    <div className='instructeurCard'>
    <a href="/instructeurDet">
      <Card>
        <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Ingénieur logiciel"
            description="Gretchen Passaquindici"
            
        />
        </Card>
    </a>
    </div>
  )
}

export default InstructeurCard