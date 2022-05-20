import React from 'react';
import {useSelector} from 'react-redux'
import { Menu } from 'antd';
import './LeftList.css';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import SecurityIcon from '@material-ui/icons/Security';
import MessageIcon from '@material-ui/icons/Message';
import ShopIcon from '@material-ui/icons/Shop';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarsIcon from '@material-ui/icons/Stars';

// Routes instructeur
const routes=[
    {
        key:"1",
        icon:<PersonIcon />,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"2",
        icon:<DescriptionIcon />,
        name:"Mes formations",
        path:"/mes-formations"
    },
    {
        key:"3",
        icon:<EventIcon />,
        name:"Mes événements",
        path:"/mes-evenements"
    },
    {
        key:"4",
        icon:<MonetizationOnIcon />,
        name:"Mes gains",
        path:"/mes-gains"
    },
    {
        key:"5",
        icon:<ShopIcon />,
        name:"Mes achats",
        path:"/mes-achats"
    },
    {
        key:"6",
        icon:<SettingsIcon />,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"7",
        icon:<ExitToAppIcon />,
        name:"Se déconnecter",
    },

]
// Routes apprenant
const routes1=[
    {
        key:"1",
        icon:<PersonIcon />,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"2",
        icon:<ShopIcon />,
        name:"Mes achats",
        path:"/mes-achats"
    },
    {
        key:"3",
        icon:<StarsIcon />,
        name:"Mes favoris",
        path:"/mes-favoris"
    },
    {
        key:"4",
        icon:<MessageIcon />,
        name:"Messages",
        path:"/messages"
    },
    {
        key:"5",
        icon:<SmsFailedIcon />,
        name:"Réclamtions",
        path:"/reclamations"
    },
    {
        key:"6",
        icon:<SettingsIcon />,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"8",
        icon:<ExitToAppIcon />,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },
]
// Routes admin
const routes2=[
    {
        key:"1",
        icon:<DashboardIcon />,
        name:"Tableau du bord",
        path:"/tableau-bord"
    },
    {
        key:"2",
        icon:<PersonIcon />,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"3",
        icon:<BusinessCenterIcon />,
        name:"Instructeurs",
        path:"/instructeur"
    },
    {
        key:"4",
        icon:<SchoolIcon />,
        name:"Apprenants",
        path:"/apprenants"
    },
    {
        key:"5",
        icon:<DescriptionIcon />,
        name:"Formations",
        path:"/all-formations"
    },
    {
        key:"6",
        icon:<EventIcon />,
        name:"Événements",
        path:"/evenements"
    },
    {
        key:"7",
        icon:<SmsFailedIcon />,
        name:"Réclamtions",
        path:"/all-reclamation"
    },
    {
        key:"8",
        icon:<SettingsIcon />,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"9",
        icon:<ExitToAppIcon />,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },

]
// Routes super admin
const routes3=[
    {
        key:"1",
        icon:<DashboardIcon />,
        name:"Tableau du bord",
        path:"/tableau-bord"
    },
    {
        key:"2",
        icon:<PersonIcon />,
        name:"Profile",
        path:"/profile",
    },
    {
        key:"3",
        icon:<SecurityIcon />,
        name:"Administrateur",
        path:"/administrateurs"
    },
    {
        key:"4",
        icon:<BusinessCenterIcon />,
        name:"Instructeurs",
        path:"/instructeur"
    },
    {
        key:"5",
        icon:<SchoolIcon />,
        name:"Apprenants",
        path:"/apprenants"
    },
    {
        key:"6",
        icon:<CategoryIcon />,
        name:"Catégories",
        path:"/categories"
    },
    {
        key:"7",
        icon:<DescriptionIcon />,
        name:"Formations",
        path:"/all-formations"
    },
    {
        key:"8",
        icon:<EventIcon />,
        name:"Événements",
        path:"/evenements"
    },
    {
        key:"9",
        icon:<SmsFailedIcon />,
        name:"Réclamtions",
        path:"/all-reclamation"
    },
    {
        key:"10",
        icon:<SettingsIcon />,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"11",
        icon:<ExitToAppIcon />,
        name:"Se déconnecter",
        path:"/se-deconnecter"
    },

]
function mapping(x){
    const menu= x.map( (routes) => (
        <Menu.Item key={routes.key} icon={routes.icon} className="menu-item-left">
        <a href={routes.path} className="menu-title-item">
        {routes.name}</a>
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
          style={{ backgroundColor:"#F6F7F8", marginTop:"20px"}}
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
