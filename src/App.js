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
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader, { loader } from "./modules/loading";
import Menubar from "./modules/menubar";
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
    window.addEventListener("load", this.handleLoad());
  }

  handleLoad() {
    console.log("Loaded");
    setTimeout(
      this.setState({
        loader: false
      }),
      5000
    );
  }
  handleChange() {
    console.log(radioValue);
    const csBackground = "linear-gradient(200deg, #0b3081 10%, #000000 100%)";
    const filmBackground = "linear-gradient(200deg, #0b8171 10%, #000000 100%)";
    if (document.getElementById("cs").checked) {
      document.body.style.backgroundImage = csBackground;
    } else {
      document.body.style.backgroundImage = filmBackground;
      radioValue = "film";
    }
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
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
              <Menubar></Menubar>
            </Sider>
            <Layout style={{ background: "transparent" }}>
            <Content style={{ background: "transparent" }}>
              <Row type="flex" justify="center" align="middle">
              <Col lg={{span : 12, offset : 5}} sm={{span : 6, offset : 3}}>
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
              <Col span={12} offset={5}>
                <Paper elevation={0} style={{ background: "transparent" }}>
                  <NameDrawer></NameDrawer>
                </Paper>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
              <Col span={18} offset={5}>
                <Typewriter></Typewriter>
                </Col>
              </Row>
            </Content>
          </Layout>
          </Layout>
        </React.Fragment>
      );
    }
  }
}

export default App;
