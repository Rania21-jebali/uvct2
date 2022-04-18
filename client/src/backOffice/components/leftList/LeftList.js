import React from 'react';
import { Menu} from 'antd';
import './LeftList.css';
import { useState } from 'react';

const routes=[
    {
        key:"1",
        icon:<img src="images/profile.svg" alt=""/>,
        name:"Profile",
        path:"/profile"
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
      <a href={routes.path}>{routes.name}</a>
      </Menu.Item>
     
  ))
         return menu;
   }
export default function LeftList({children})  {  
    const [current,setCurrent]=useState("1");
    const handleClick = e => {
        console.log('click ', e);
        setCurrent({current:e.key})
    }
    return (
        <>
      <div  className="leftList">
        <Menu
          mode="inline"
          onClick={handleClick}
          style={{ background:"#F6F7F8", marginTop:"90px"}}
          selectedKeys={[current]}

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
