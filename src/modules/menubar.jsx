import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import {
  Events,
  animateScroll as scroll,
  scroller
} from "react-scroll";
import {Link} from 'react-router-dom'
const { Sider } = Layout;


class Menubar extends Component {
    state = {
        collapsed : false,
        screenWidth : this.props.screenWidth,
        isMobile : this.props.isMobile
    }
    constructor(props) {
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
    }
    componentDidUpdate(prevProps){
      if((this.props.screenWidth !== prevProps.screenWidth)||(this.props.isMobile !== prevProps.isMobile)){
        this.setState({
          screenWidth : this.props.screenWidth,
          isMobile : this.props.isMobile
        })
      }
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
    scrollTo = (element,speed) => e => {
      scroller.scrollTo(element, {
        duration: speed,
        delay: 0,
        smooth: 'easeInOutQuart',
        spy : true
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
            breakpoint="xl"
            collapsedWidth= {this.state.screenWidth  > 600 && this.state.isMobile === false ? "8.5vw" : "0%"}
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                <a onClick={this.scrollToTop}>
                  <Icon type="home" />
                  <span className="nav-text">Home</span>
                  </a>
                </Menu.Item>
                <Menu.Item key="2" disabled>
                  <Icon type="video-camera" />
                  <span className="nav-text">Filmography</span>
                </Menu.Item>
                <Menu.Item key="8" >
                  <a href="https://photography.cryogenicplanet.tech">
                  <Icon type="camera" />
                  <span className="nav-text">Photography</span>
                  </a>
                </Menu.Item>
                <Menu.Item key="3">
                {/* <Link activeClass="active" className="a" to="about" spy={true} smooth={true} duration={1200} > */}
                  <a onClick={this.scrollTo('about',1200)}>             
                  <Icon type="user" />
                  <span className="nav-text">About me</span>
                  </a>
                  {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="4">
                {/* <Link  className="experience" to="experience" spy={true} smooth={true} duration={1400} > */}
                  <a onClick={this.scrollTo('experience',1400)}>               
                  <Icon type="bar-chart" />
                  <span className="nav-text">Work Experience</span>
                  </a>
  
                  {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="5">
                {/* <Link  className="projects" to="projects" spy={true} smooth={true} duration={1500} > */}
                  <a onClick={this.scrollTo('projects',1500)}>
                  <Icon type="cloud-o" />
                  <span className="nav-text">Projects</span>
                  </a>
                  {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="6">
                {/* <Link  className="skills" to="skills" spy={true} smooth={true} duration={1600} > */}
                  <a onClick={this.scrollTo('skills',1600)}>
                  <Icon type="appstore-o" />
                  <span className="nav-text">Skills</span>
                  </a>
                  {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="7">
                {/* <Link  className="contact" to="contact" spy={true} smooth={true} duration={1600} > */}
                  <a onClick={this.scrollTo('contact',1600)}>
                  <Icon type="team" />
                  <span className="nav-text">Contact</span>
                  </a>
                  {/* </Link> */}
                </Menu.Item>
                
              </Menu>
            </Sider>
        );
    }
}

export default Menubar;