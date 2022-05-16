import React from 'react'
import { Empty } from 'antd';
import './Panier.css'
import { Button } from 'react-bootstrap';

function Panier() {
  return (
    <div className='panier'>
    <h1>Panier</h1>
    <div className='content-panier'>
        <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
        height: 60,
        }}
        description={
        <span>
           Votre panier est vide. Continuez vos achats et trouvez un cours !
        </span>
        }
        >
        <Button href="/" className="btn-achat">Continuer vos achats</Button>
    </Empty>
    </div>
    
    </div>
  )
}

export default Panier