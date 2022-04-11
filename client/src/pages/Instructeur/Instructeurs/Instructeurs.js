import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import TabPanel1 from '../../../components/tabPanel/TabPanel1'
import InstructeurList from '../InstructeurList/InstructeurList'
import './Instructeurs.css'

function Instructeurs() {
  return (
    <div className="cantainerList">
     <BreadcrumbHeader item="Table de bord" active="Apprenants" />
     <TabPanel1 tab1="Tous" tab2="Transactions"  
     item1={<InstructeurList />} 
     />
    </div>
  )
}

export default Instructeurs