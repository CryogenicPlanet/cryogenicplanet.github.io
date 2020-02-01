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
    this.handleLoad(2000)
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
            <Content style={{ background: "transparent" }}>
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
              <Col span={16} offset={7}>
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
