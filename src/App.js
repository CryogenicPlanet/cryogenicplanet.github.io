import React, { Component } from "react";
import { Button, Col, Row, Menu, Icon, Layout, Typography } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader, { loader } from "./modules/loading";
import Menubar from "./modules/menubar";
//import  Animator from "./modules/animation/animation"
import "./App.css";
import { render } from "@testing-library/react";
import {Animator, NameDrawer} from "./modules/animation/animation";

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
const brackets = "<>";
class App extends Component {
  state = {
    loader: true,
    searchResults: []
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

  render() {
    if (this.state.loader) {
      return <Loader show={this.state.loader} />;
    } else {
      return (
        // <div className="search"><Search/></div>
        //<Col span={8} offset={4}><Animator></Animator></Col>
        <React.Fragment>
          <Layout style={{background : "transparent"}}>
            <Menubar></Menubar>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6} style={{opacity : "0%"}}> <h1>A</h1></Grid>
                <Grid item><Paper elevation={0} style={{background : "transparent",color :"#fff"}}><Animator></Animator></Paper></Grid>
                
                <Grid item><Paper elevation={0} style={{background : "transparent"}}><NameDrawer></NameDrawer></Paper></Grid>

                <Grid item xs={6} style={{opacity : "100%"}}> <h1 style={{color : "#fff"}}>Site is currently under construction</h1></Grid>
              </Grid>
            
          </Layout>
        </React.Fragment>
      );
    }
  }
}

export default App;


