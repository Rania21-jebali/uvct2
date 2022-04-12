import React from 'react';
import { Menu, Button } from 'antd';
import './LeftBar.css'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class LeftBar extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
 
  render() {
    
    return (
      <div style={{ width: 256 }}>
        <Button type="light" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
          <a href="/profil">profile</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Mon apprentissage
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Mes achats
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Mes formations">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <Menu.Item key="sub2" icon={<AppstoreOutlined />} >
          Mes favoris
          </Menu.Item>
        </Menu>
        </div>
    );
  }
}