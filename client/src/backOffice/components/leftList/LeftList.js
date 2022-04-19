import React from 'react';
import { Menu } from 'antd';
import './LeftList.css';

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
        icon:<img src="images/setting.png" alt=""/>,
        name:"Paramétres",
        path:"/parametres"
    },
    {
        key:"5",
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
    return (
        <>
      <div  className="leftList">
        <Menu
          mode="inline"
          style={{ background:"#F6F7F8", marginTop:"90px"}}
        >
        {mapping(routes)}
        </Menu>
        </div>
        <main className="children-content">
         {children}
        </main>
        </>
    );
  }
