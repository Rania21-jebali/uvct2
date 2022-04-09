import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default function LeftBar(props){
 const handleClick = e => {
    console.log('click ', e);
  };
 
  
    return (
        <div className='leftBar'>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
      <Menu.Item key="1" icon={<MailOutlined />} ><a href="/profil">Profil</a></Menu.Item>
      <Menu.Item key="2" icon={<AppstoreOutlined />}><a href="/">Mon apprentissage</a></Menu.Item>
      <Menu.Item key="3" icon={<AppstoreOutlined />}><a href="/profil">Liste de souhaits</a></Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}><a href="/profil">Mes achats</a></Menu.Item>          
      </Menu>
      </div>
    );
    }

