/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import data from "./data";
import Image from "material-ui-image";
import { Col, Row, List, Typography, Icon, Tooltip, Button } from "antd";
import { Parallax, Background } from "react-parallax";
//import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Title } = Typography;

class Projects extends Component {
  state = {
    extraProject: false,
    fontSize: this.props.fontSize,
    screenWidth: this.props.screenWidth,
    isMobile: this.props.isMobile,
  };
  moreProjects = () => {
    this.setState({
      extraProject: true,
    });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.screenWidth !== prevProps.screenWidth ||
      this.props.isMobile !== prevProps.isMobile
    ) {
      this.setState({
        screenWidth: this.props.screenWidth,
        isMobile: this.props.isMobile,
      });
    }
  }
  render() {
    return (
      <Fragment>
        <section color="black">
          <Row type="flex" justify="center" align="middle">
            <Title>Projects</Title>
          </Row>

          {data.map((project) => {
            return (
              <Fragment>
                <Parallax
                  bgImage={
                    process.env.PUBLIC_URL +
                    `/images/projects/${project.parallax}`
                  }
                  style={{ height: "25vw", paddingBottom: "5%" }}
                  blur={{ min: -15, max: 15 }}
                  bgImageStyle={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  strength={150}
                ></Parallax>
              </Fragment>
            );
          })}

          <Row type="flex" justify="center" align="middle">
            <Tooltip title="Under Construction">
              <Button type="dashed" block disabled onClick={this.moreProjects}>
                More Projects
              </Button>
            </Tooltip>
          </Row>
        </section>
      </Fragment>
    );
  }
}

export default Projects;
