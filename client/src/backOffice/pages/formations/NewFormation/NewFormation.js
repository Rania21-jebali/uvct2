import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import Certificat from './Certificat/Certificat'
import Commentaires from './Commentaires/Commentaires'
import Coupons from './Coupons/Coupons'
import Curriculum from './Curriculum/Curriculum'
import Etudiants from './Etudiants/Etudiants'
import Informations from './informations/Informations'
import '../Formation.css'
function NewFormation() {
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Mes formations" link="mes-formations" active="Ajouter une nouvelle formation "/>
     <div className='scrolltab'>
     <ScrollTab label1="Informations" label2="Curriculum" label3="Coupons" 
     label4="Commentaires" label5="Certificat" label6="Étudiants" 
     item1={<Informations />} item2={<Curriculum />} item3={<Coupons />}
     item4={<Commentaires />} item5={<Certificat />} item6={<Etudiants />}
    />
     </div>
    </div>
  )
}

export default NewFormation