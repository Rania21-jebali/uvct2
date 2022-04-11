import React from 'react';
import { Menu, Button } from 'antd';
import './LeftBar.css'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import HomeIcon from '@material-ui/icons/Home';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import EventIcon from '@material-ui/icons/Event';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const { SubMenu } = Menu;

export default class LeftBarAdmin extends React.Component {
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
          <Menu.Item key="1" icon={<HomeIcon />}>
          <a href="/dashbord">Tableau de bord</a>
          </Menu.Item>
          <Menu.Item key="3" icon={<SupervisorAccountIcon />}>
          <a href="/users"> Apprenants</a>
          </Menu.Item>
          <SubMenu key="sub1" icon={<RecordVoiceOverIcon />} title="Instructeurs">
            <Menu.Item key="5">
            <a href="/instructeurs"> Instructeurs</a>
            </Menu.Item>
            <Menu.Item key="6">
            <a href="/candidature"> Candidature</a>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<CastForEducationIcon />} title="Formations">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<EventIcon />} title="Évènements">
            <Menu.Item key="11">Option 9</Menu.Item>
            <Menu.Item key="12">Option 10</Menu.Item>
          </SubMenu>
          <Menu.Item key="13" icon={<FeedbackIcon />}>
          <a href="/users"> Réclamations</a>
          </Menu.Item>
          <Menu.Item key="14" icon={<ExitToAppIcon />}>
          <a href="/users"> Déconncter</a>
          </Menu.Item>
        </Menu>
        </div>
    );
  }
}