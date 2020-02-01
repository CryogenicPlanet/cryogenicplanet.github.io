import React, { Component } from 'react';
import { Button, Layout, Menu, Icon} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu;


class Menubar extends Component {
    state = {
        collapsed : false
    }
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render() {
        return (
            
            <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                  <Icon type="home" />
                  <span className="nav-text">Home</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span className="nav-text">Filmography</span>
                </Menu.Item>
                <Menu.Item key="8">
                  <Icon type="camera" />
                  <span className="nav-text">Photography</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="user" />
                  <span className="nav-text">About me</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="bar-chart" />
                  <span className="nav-text">Work Experience</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="cloud-o" />
                  <span className="nav-text">Projects</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="appstore-o" />
                  <span className="nav-text">Skills</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <Icon type="team" />
                  <span className="nav-text">Contact</span>
                </Menu.Item>
                
              </Menu>
            </Sider>
        );
    }
}

export default Menubar;