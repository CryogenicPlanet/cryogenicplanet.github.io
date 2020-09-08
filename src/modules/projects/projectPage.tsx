/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { Component, Fragment } from "react";
import data from "./data.json";
import { BackgroundAnimation } from "../animation/animation";
import FourOFour from "../404";
import Image from "material-ui-image";
import {
  Col,
  Row,
  List,
  Typography,
  Icon,
  Tooltip,
  Button,
  Card,
  Layout,
  Divider,
  Avatar,
} from "antd";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
const { Title, Paragraph } = Typography;
const { Header, Footer, Sider, Content } = Layout;

class ProjectPage extends Component {
  state = {
    projectId: this.props.match.params.projectId,
    iconSize: "5vw",
    isMobile: this.props.isMobile,
  };

  componentDidMount() {
    let currentProject = null;
    console.log(this.state.projectId);
    for (let project of data) {
      if (project.id === this.state.projectId) {
        currentProject = project;
        this.setState({
          test: "hello",
          project: currentProject,
        });
        console.log(this.state, currentProject);
      }
    }
    if (currentProject === null) {
      this.setState({ notFound: true });
    }
    if (this.state.isMobile) {
      let body = document.body;
      body.style = `
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
  `;
      this.setState({ iconSize: "10vw" });
    }
  }

  renderIcons = (icons) => {
    const iconList = icons.map((icon) => {
      return (
        <Col>
          <img
            alt={icon}
            style={{
              width: this.state.iconSize,
              height: this.state.iconSize,
              paddingTop: "3%",
            }}
            src={process.env.PUBLIC_URL + `/images/langs/${icon}`}
          />
        </Col>
      );
    });
    return iconList;
  };

  render() {
    const { project } = this.state;
    return (
      <Fragment>
        <BackgroundAnimation
          style={
            this.state.isMobile
              ? { opacity: 0.5, position: "absoulute", zIndex: -1 }
              : { opacity: 0.3, position: "absoulute", zIndex: -1 }
          }
        ></BackgroundAnimation>
        {this.state.notFound || !project ? (
          <FourOFour></FourOFour>
        ) : (
            <Layout style={{ background: "transparent" }}>
              <Content style={{ background: "transparent" }}>
                <Container style={{ paddingTop: "2%" }}>
                  <Row type="flex" justify="center" align="middle">
                    <Col span={24}>
                      <Card
                        actions={project.links.map((link) => {
                          return (
                            <Tooltip title={link.prompt}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Icon
                                  type={link.type}
                                  style={{ fontSize: this.state.iconSize }}
                                />
                              </a>
                            </Tooltip>
                          );
                        })}
                        bordered={false}
                        style={
                          this.state.isMobile
                            ? {
                              width: "90vw",
                              backgroundColor: "rgba(96, 125, 139,0.55)",
                            }
                            : {
                              width: "40vw",
                              backgroundColor: "rgba(96, 125, 139,0.55)",
                            }
                        }
                      >
                        <Row type="flex" justify="center" align="middle">
                          <a
                            href={project.title.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.title.long ? (
                              <Title level={3}>{project.title.long}</Title>
                            ) : (
                                <Title>{project.title.name}</Title>
                              )}
                          </a>
                          <Divider />
                          <Paragraph>
                            <b>{project.slogan}</b>
                          </Paragraph>
                          <ul>
                            {project.description.map((description) => {
                              return <li>{description}</li>;
                            })}
                          </ul>
                        </Row>
                        <Row type="flex" justify="center" align="middle">
                          <div
                            id="special"
                            dangerouslySetInnerHTML={{
                              __html: project.special,
                            }}
                          ></div>
                        </Row>
                        {project.collaborators ? (
                          <Fragment>
                            <Paragraph>
                              <b>Collaborators</b>
                            </Paragraph>
                            <Row
                              type="flex"
                              justify="space-between"
                              align="middle"
                            >
                              {project.collaborators.map((teammate) => {
                                return (
                                  <Col>
                                    <a
                                      href={teammate.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Avatar
                                        style={{ verticalAlign: "middle" }}
                                        size={100}
                                      >
                                        {teammate.name}
                                      </Avatar>
                                    </a>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Fragment>
                        ) : null}
                        {project.languages ? (
                          <Fragment>
                            <Paragraph style={{ paddingTop: "2%" }}>
                              <b>Languages Used</b>
                            </Paragraph>
                            <Paper style={{ backgroundColor: "#000000" }}>
                              <Row
                                type="flex"
                                justify="space-around"
                                align="middle"
                              >
                                ({this.renderIcons(project.languages)})
                            </Row>
                            </Paper>
                          </Fragment>
                        ) : (
                            <p></p>
                          )}
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Content>
              {/* <Footer
              style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                backgroundColor: "#e53935",
              }}
            >
              Footer
            </Footer> */}
            </Layout>
          )}
      </Fragment>
    );
  }
}

export default ProjectPage;
