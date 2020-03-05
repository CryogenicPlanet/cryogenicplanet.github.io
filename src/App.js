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

const { Header, Content, Sider, Footer } = Layout;
const { Meta } = Card;
const { Text, Title } = Typography;
const brackets = "<>";
var radioValue;
class App extends Component {
  state = {
    loader: true,
    searchResults: [],
    radioValue: "cs"
  };

  componentDidMount() {
    this.handleLoad(1000)

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
              <Menubar></Menubar>
            
            <Layout style={{ background: "transparent" }}>
            <Content style={{ background: "transparent" }} name="home">
              <Row type="flex" justify="center" align="middle">
              <Col lg={{span : 10, offset : 5}} sm={{span : 6, offset : 3}}>
                <Paper
                  elevation={0}
                  style={{
                    background: "transparent",
                    color: "#fff",
                    paddingTop: "8%"
                  }}
                >
                  <Animator></Animator>
                </Paper>
                </Col>
              </Row>
              
              <Row type="flex" justify="center" align="middle">
              <Col span={10} offset={5}>
                <Paper elevation={0} style={{ background: "transparent" }}>
                  <NameDrawer></NameDrawer>
                </Paper>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
              <Col span={8} offset={2}>
              <Row type="flex" justify="space-between" align="middle">
              <a href="https://github.com/CryogenicPlanet"><Icon type="github" style={{fontSize : "2vw"}}/></a>
              <a href="https://www.linkedin.com/in/rahul-tarak/"><Icon type="linkedin" style={{fontSize : "2vw"}}/></a>
              <a href="https://www.youtube.com/channel/UC49yeT9WnpVdIdmo4ZYUteQ"><Icon type="youtube" style={{fontSize : "2vw"}}/></a>
              <a href="https://www.instagram.com/cryogenicplanet/"><Icon type="instagram" style={{fontSize : "2vw"}}/></a>
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
                  
                  <About></About>
                  
                  </Col>
              </Row>
              </Element>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col>
                      <Element name="experience" className="element">
                        <Experience></Experience>
                      </Element>
                    </Col>
                </Row>
              </Paper>
              <Paper elevation={0} style={{background : "#212121"}}>
                <Row  type="flex" justify="center" align="middle" style={{paddingTop : "5%"}}>
                    <Col>
                      <Element name="skills" className="element">
                      <Row  type="flex" justify="center" align="middle" style={{paddingTop : "1%"}}>
                        <Title>Skills</Title>
                      </Row>
                        <Skills></Skills>
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
          </Layout>
          </Layout>
        </React.Fragment>
      );
    }
  }
}

export default App;
