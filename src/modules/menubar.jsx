import React, { Component } from 'react';
import { Button, Layout, Menu, Icon} from 'antd';
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu;


class Menubar extends Component {
    state = {
        collapsed : false
    }
    constructor(props) {
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
    }
  
    componentDidMount() {
  
      Events.scrollEvent.register('begin', function () {
        console.log("begin", arguments);
      });
  
      Events.scrollEvent.register('end', function () {
        console.log("end", arguments);
      });
      this.scrollToTop()
    }
    scrollToTop() {
      scroll.scrollToTop();
    }
    scrollTo() {
      scroller.scrollTo('scroll-to-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    }
    scrollToWithContainer() {
  
      let goToContainer = new Promise((resolve, reject) => {
  
        Events.scrollEvent.register('end', () => {
          resolve();
          Events.scrollEvent.remove('end');
        });
  
        scroller.scrollTo('scroll-container', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
  
      });
  
      goToContainer.then(() =>
        scroller.scrollTo('scroll-container-second-element', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          containerId: 'scroll-container'
        }));
    }
    componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    }
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
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['8']}>
                <Menu.Item key="1">
                <a onClick={this.scrollToTop}>
                  <Icon type="home" />
                  <span className="nav-text">Home</span>
                  </a>
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
                <Link activeClass="active" className="about" to="about" spy={true} smooth={true} duration={1200} >
                  <Icon type="user" />
                  <span className="nav-text">About me</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                <Link  className="experience" to="experience" spy={true} smooth={true} duration={1400} >
                  <Icon type="bar-chart" />
                  <span className="nav-text">Work Experience</span>
                  </Link>
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