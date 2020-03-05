import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  Menu,
  Icon,
  Layout,
  Typography,
  Card,
  Avatar
} from "antd";
import Paper from "@material-ui/core/Paper";
import Loader, { loader } from "./modules/loading";
import Menubar from "./modules/menubar";
import About from "./modules/about"
import Experience from "./modules/experience/experience"
import Skills from "./modules/skills/skills"
import Contact from "./modules/contact"
import Projects from "./modules/projects/projects"
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import "./App.less";
import Scrollspy from 'react-scrollspy'
import { render } from "@testing-library/react";
import {
  Animator,
  NameDrawer,
  Typewriter
} from "./modules/animation/animation";

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const NetlifySvg = () => (
  <svg width="1em" height="1em" fill="#25C7B7" viewBox="0 0 256 256">
        <path d="M153.094392,165.678589 L90.3094111,152.558384 C90.0414069,153.070392 89.7534024,153.566399 89.4333974,154.034407 L146.59029,237.41171 L150.038344,233.967656 L159.762496,173.498711 C156.454445,172.110689 153.966406,169.210644 153.094392,165.678589 L153.094392,165.678589 Z M130.190034,83.6053063 C127.837997,87.2133627 123.777934,89.6014 119.153862,89.6014 C118.441851,89.6014 117.74984,89.5293989 117.069829,89.4213972 L88.4373818,134.222097 L164.934577,101.301583 C164.910577,100.993578 164.842576,100.705574 164.842576,100.389569 C164.842576,99.7455585 164.930577,99.1215488 165.034579,98.5055391 L130.190034,83.6053063 L130.190034,83.6053063 Z M132.270067,75.4411788 L169.334646,91.2894264 C170.506664,90.3734121 171.842685,89.6934015 173.310708,89.281395 L179.402803,51.4008031 L156.194441,28.1924405 L130.070032,69.0690792 C131.322052,70.9171081 132.098064,73.0931421 132.270067,75.4411788 L132.270067,75.4411788 Z M209.93528,81.9332802 L186.674917,58.6689167 L181.618838,90.0774075 C182.906858,90.7294176 184.054876,91.5974312 185.014891,92.6614478 L209.93528,81.9332802 L209.93528,81.9332802 Z M154.206409,157.406459 C156.018438,154.130408 159.36249,151.866373 163.294551,151.562368 L169.974656,110.013719 C169.450648,109.665714 168.98264,109.249707 168.522633,108.8217 L91.585431,141.934218 C91.7814341,142.73823 91.9174362,143.558243 91.9814372,144.410256 L154.206409,157.406459 L154.206409,157.406459 Z M216.271379,88.2733793 L189.358959,99.8535602 L255.759996,128.242004 L256,128.002 L216.271379,88.2733793 L216.271379,88.2733793 Z M168.178628,173.622713 L160.090501,223.907499 L207.055235,176.942765 L173.226707,169.878654 C171.934686,171.562681 170.202659,172.866701 168.178628,173.622713 L168.178628,173.622713 Z M76.8932015,160.694511 C75.1931749,160.694511 73.5651495,160.402506 72.0411256,159.886498 L56.4408819,184.29888 L50.4127877,178.274786 L65.1890186,155.154424 C64.8210128,154.702417 64.4850076,154.22641 64.1690026,153.738402 L37.4005844,165.262582 L31.0564853,158.918483 L60.3569431,146.306286 L7.38411538,135.250113 L0.140002188,128.002 L2.432038,125.709964 L63.5169925,138.462163 C64.2250035,137.126143 65.1250176,135.898123 66.1850341,134.846107 L36.5365709,91.6014313 L42.5246644,85.6133377 L73.5011485,130.798044 C74.5931655,130.55004 75.7251832,130.402038 76.8932015,130.402038 C78.2012219,130.402038 79.4692417,130.58604 80.6812606,130.898045 L109.665714,85.5453366 C107.393678,83.1772996 105.989656,79.9692495 105.989656,76.4291942 C105.989656,75.389178 106.121658,74.3811622 106.349662,73.4131471 L70.1890967,57.9529055 L76.5331958,51.6088064 L110.793731,66.2610353 C113.069767,64.3890061 115.981812,63.2649885 119.157862,63.2649885 C120.657885,63.2649885 122.097908,63.5289926 123.445929,63.9929999 L150.170346,22.1683464 L128.002,0 L0,128.002 L128.002,256.004 L140.598197,243.407803 L83.0132971,159.398491 C81.1372678,160.226504 79.0692355,160.694511 76.8932015,160.694511 L76.8932015,160.694511 Z M178.122783,111.805747 L171.326677,154.042407 C173.666714,155.930436 175.226738,158.69448 175.522743,161.854529 L214.095345,169.906655 L249.415897,134.586103 L185.662901,107.329677 C183.874873,109.705714 181.202831,111.35374 178.122783,111.805747 L178.122783,111.805747 Z" ></path>
</svg>
);
const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
const NetlifyIcon = props => <Icon component={NetlifySvg} {...props} />;
const { Header, Content, Sider, Footer } = Layout;
const { Meta } = Card;
const { Text, Title,Paragraph } = Typography;
const brackets = "<>";
var radioValue;
class App extends Component {
  state = {
    loader: true,
    searchResults: [],
    radioValue: "cs",
    screenWidth : window.innerWidth,
    iconSize : "2vw",
    smallIconSize : "1.5vw"
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
    this.handleLoad(1000)

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    if(window.innerWidth > 768){
    this.setState({ screenWidth: window.innerWidth });
    } else if(window.innerWidth > 600) {
      this.setState({screenWidth : window.innerWidth, iconSize : "4vw",smallIconSize : "3vw"})
    } else {
      this.setState({screenWidth : window.innerWidth, iconSize : "7vw",smallIconSize:"6vw"})
    }
 }
  
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  handleLoad = async (milliseconds) => {
    await this.sleep(milliseconds)
    this.setState({
      loader : false
    })
  }
  render() {
    if (this.state.loader) {
      return <Loader show={this.state.loader} />;
    } else {
      return (
        // <div className="search"><Search/></div>
        //<Col span={8} offset={4}><Animator></Animator></Col>
        <React.Fragment>
          <Layout style={{ background: "transparent" }}>
              <Menubar screenWidth={this.state.screenWidth}></Menubar>
            
            <Layout style={{ background: "transparent" }}>
            <Content style={this.state.screenWidth > 600 ? { background: "transparent" } : {background : "#212121"}} name="home">
              <Row type="flex" justify="center" align="middle">
              <Col lg={{span : 10, offset : 5}} sm={{span : 10, offset : 3}}>
                <Paper
                  elevation={0}
                  style={{
                    background: "transparent",
                    color: "#fff",
                    paddingTop: "8%"
                  }}
                >
                  <Animator screenWidth={this.state.screenWidth}></Animator>
                </Paper>
                </Col>
              </Row>
              
              <Row type="flex" justify="center" align="middle">
              <Col span={10} offset={5}>
                <Paper elevation={0} style={{ background: "transparent" }}>
                  <NameDrawer screenWidth={this.state.screenWidth}></NameDrawer>
                </Paper>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
              <Col span={8} offset={2}>
              <Row type="flex" justify="space-between" align="middle">
              <a href="https://github.com/CryogenicPlanet"><Icon type="github" style={{fontSize : this.state.iconSize}}/></a>
              <a href="https://www.linkedin.com/in/rahul-tarak/"><Icon type="linkedin" style={{fontSize : this.state.iconSize}}/></a>
              <a href="https://www.youtube.com/channel/UC49yeT9WnpVdIdmo4ZYUteQ"><Icon type="youtube" style={{fontSize : this.state.iconSize}}/></a>
              <a href="https://www.instagram.com/cryogenicplanet/"><Icon type="instagram" style={{fontSize : this.state.iconSize}}/></a>
              </Row> 
              </Col>
              </Row>
              <div style={{paddingTop : "16%"}}></div>
              <Paper elevation={0} style={{background : "#212121"}}>
              <Element name="about" className="element"> 
              <Row  type="flex" justify="center" align="middle" style={{paddingTop : "1%"}}>
                  <Title>About Me</Title>
              </Row>
              <Row  type="flex" justify="center" align="middle">
                  <Col span={12} offset={3}>
                  
                  <About screenWidth={this.state.screenWidth}></About>
                  
                  </Col>
              </Row>
              </Element>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col span={16}>
                      <Element name="experience" className="element">
                        <Experience fontSize={this.state.smallIconSize}></Experience>
                      </Element>
                    </Col>
                </Row>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col span={16}>
                      <Element name="projects" className="element">
                        <Projects fontSize={this.state.smallIconSize} screenWidth={this.state.screenWidth}></Projects>
                      </Element>
                    </Col>
                </Row>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col span={16}>
                      <Element name="skills" className="element">
                      <Row  type="flex" justify="center" align="middle" style={{paddingTop : "1%"}}>
                        <Title>Skills</Title>
                      </Row>
                        <Skills screenWidth={this.state.screenWidth}></Skills>
                      </Element>
                    </Col>
                </Row>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col>
                      <Element name="contact" className="element">
                      <Row  type="flex" justify="center" align="middle" style={{paddingTop : "1%"}}>
                        <Title>Contact Me</Title>
                      </Row>
                        <Contact></Contact>
                      </Element>
                    </Col>
                </Row>
              </Paper>
            </Content>
            <Footer>
            <Row  type="flex" justify="center" align="middle">
                <Paragraph> {`<> `} with  <HeartIcon style={{ color: 'hotpink' }} /> by <a href="https://github.com/CryogenicPlanet" target="_blank">CryogenicPlanet</a></Paragraph>
              </Row>  
              <Row  type="flex" justify="center" align="middle">
                <Paragraph>Powered by <a href="https://www.netlify.com/" target="_blank"><NetlifyIcon></NetlifyIcon></a></Paragraph>
              </Row>
              <Row  type="flex" justify="center" align="middle">
              CryogenicPlanet © 2020
              </Row>
            </Footer>
          </Layout>
          </Layout>
        </React.Fragment>
      );
    }
  }
}

export default App;
