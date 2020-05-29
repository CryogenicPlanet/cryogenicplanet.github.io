/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import data from "./data";
import Image from "material-ui-image";
import { Col, Row, List, Typography, Icon, Tooltip, Button, Card } from "antd";
import { Parallax, Background } from "react-parallax";
import Paragraph from "antd/lib/skeleton/Paragraph";
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
            if (project.parallax) {
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
                  >
                    <Card
                      bordered={false}
                      style={{
                        width: "20vw",
                        backgroundColor: " rgba(96, 125, 139,0.55)",
                      }}
                    >
                      <Title
                        ellipsis
                        level={3}
                        style={{ opacity: 1, color: "white" }}
                      >
                        {project.title.name}
                      </Title>
                      <p style={{ color: "white" }}>{project.slogan}</p>
                      <Button type="primary" href={`/Projects/${project.id}`}>
                        Learn More!
                      </Button>
                    </Card>
                  </Parallax>
                </Fragment>
              );
            } else {
              // Video File
              return (
                <Fragment>
                  <Card
                    bordered={false}
                    style={{
                      width: "20vw",
                      zIndex: 10,
                      position: "absolute",
                      backgroundColor: " rgba(96, 125, 139,0.55)",
                    }}
                  >
                    <Title
                      ellipsis
                      level={3}
                      style={{ opacity: 1, color: "white" }}
                    >
                      {project.title.name}
                    </Title>
                    <p style={{ color: "white" }}>{project.slogan}</p>
                    <Button type="primary" href={`/Projects/${project.id}`}>
                      Learn More!
                    </Button>
                  </Card>
                  <video
                    style={{
                      maxHeight: "25vw",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                    playsinline
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={
                        process.env.PUBLIC_URL +
                        `/images/projects/${project.video}.webm`
                      }
                      type="video/webm"
                    ></source>
                    <source
                      src={
                        process.env.PUBLIC_URL +
                        `/images/projects/${project.video}.mp4`
                      }
                      type="video/mp4"
                    ></source>
                  </video>
                </Fragment>
              );
            }
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
