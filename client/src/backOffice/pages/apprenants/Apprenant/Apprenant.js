import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import Profile from './Profile'


function Apprenant() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste Apprenants" link="/apprenants" active="Apprenant"/>
     <div className='scrolltab'>
     <ScrollTab label1="Profile" label2="Ses activités"  
     item1={<Profile />} item2=""
    />
     </div>
    </div>
  )
}

export default Apprenant