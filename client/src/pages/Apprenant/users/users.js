import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import TabPanel1 from '../../../components/tabPanel/TabPanel1'
import ListUsers from '../listUsers/ListUsers'
import './users.css'

function Users() {
  return (
    <div className="cantainerList">
     <BreadcrumbHeader item="Table de bord" active="Apprenants" />
     <TabPanel1 tab1="Tous" tab2="Transactions"  
     item1={<ListUsers />} 
     />
    </div>
  )
}

export default Users