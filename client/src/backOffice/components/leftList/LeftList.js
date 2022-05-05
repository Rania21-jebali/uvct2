import React from 'react';
import {useSelector} from 'react-redux'
import { Menu } from 'antd';
import './LeftList.css';

// Routes instructeur
const routes=[
    {
        key:"1",
        icon:<img src="images/profile.svg" alt=""/>,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"2",
        icon:<img src="images/Formations.png" alt=""/>,
        name:"Mes formations",
        path:"/mes-formations"
    },
    {
        key:"3",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes événements",
        path:"/mes-evenements"
    },
    {
        key:"4",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes gains",
        path:"/mes-gains"
    },
    {
        key:"5",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes achats",
        path:"/mes-achats"
    },
    {
        key:"6",
        icon:<img src="images/setting.png" alt=""/>,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"7",
        icon:<img src="images/logout.png" alt=""/>,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },

]
// Routes apprenant
const routes1=[
    {
        key:"1",
        icon:<img src="images/profile.svg" alt=""/>,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"2",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes achats",
        path:"/mes-achats"
    },
    {
        key:"3",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes événements",
        path:"/mes-evenements"
    },
    {
        key:"4",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes favoris",
        path:"/mes-favoris"
    },
    {
        key:"5",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Messages",
        path:"/messages"
    },
    {
        key:"6",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Réclamtions",
        path:"/reclamations"
    },
    {
        key:"7",
        icon:<img src="images/setting.png" alt=""/>,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"8",
        icon:<img src="images/logout.png" alt=""/>,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },
]
// Routes admin
const routes2=[
    {
        key:"1",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Tableau du bord",
        path:"/tableau-bord"
    },
    {
        key:"2",
        icon:<img src="images/profile.svg" alt=""/>,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"3",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Instructeurs",
        path:"/instructeur"
    },
    {
        key:"4",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Apprenants",
        path:"/apprenants"
    },
    {
        key:"5",
        icon:<img src="images/Formations.png" alt=""/>,
        name:"Mes formations",
        path:"/mes-formations"
    },
    {
        key:"6",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes événements",
        path:"/mes-evenements"
    },
    {
        key:"7",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Réclamtions",
        path:"/reclamations"
    },
    {
        key:"8",
        icon:<img src="images/setting.png" alt=""/>,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"9",
        icon:<img src="images/logout.png" alt=""/>,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },

]
// Routes super admin
const routes3=[
    {
        key:"1",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Tableau du bord",
        path:"/tableau-bord"
    },
    {
        key:"2",
        icon:<img src="images/profile.svg" alt=""/>,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"3",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Administrateur",
        path:"/administrateurs"
    },
    {
        key:"4",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Instructeurs",
        path:"/instructeur"
    },
    {
        key:"5",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Apprenants",
        path:"/apprenants"
    },
    {
        key:"6",
        icon:<img src="images/setting.png" alt=""/>,
        name:"Catégories",
        path:"/categories"
    },
    {
        key:"7",
        icon:<img src="images/Formations.png" alt=""/>,
        name:"Mes formations",
        path:"/mes-formations"
    },
    {
        key:"8",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Mes événements",
        path:"/mes-evenements"
    },
    {
        key:"9",
        icon:<img src="images/calendar.png" alt=""/>,
        name:"Réclamtions",
        path:"/reclamations"
    },
    {
        key:"10",
        icon:<img src="images/setting.png" alt=""/>,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"11",
        icon:<img src="images/logout.png" alt=""/>,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },

]
function mapping(x){
    const menu= x.map( (routes) => (
        <Menu.Item key={routes.key} icon={routes.icon} className="menu-item-left">
      <a href={routes.path} className="menu-title-item">{routes.name}</a>
      </Menu.Item>
     
  ))
         return menu;
   }
  
export default function LeftList({children})  { 
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin ,isInstr, isSuperAdmin} = auth 
    return (
        <>
      <div  className="leftList">
        <Menu
          mode="inline"
          style={{ background:"#F6F7F8", marginTop:"20px"}}
        >
        { isInstr && mapping(routes)}
        { (isLogged && !isInstr && !isSuperAdmin && !isAdmin) && mapping(routes1)}
        { isAdmin && mapping(routes2)}
        { isSuperAdmin && mapping(routes3)}
        </Menu>
        </div>
        <main className="children-content">
         {children}
        </main>
        </>
    );
  }
