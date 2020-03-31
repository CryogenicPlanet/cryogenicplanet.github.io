import React, { Component, Fragment } from "react";
import data from "./data";
import Image from "material-ui-image";
import { Col, Row, List, Typography, Icon, Tooltip, Button } from "antd";
//import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Title } = Typography;

class Projects extends Component {
  state = {
    extraProject: false,
    fontSize: this.props.fontSize,
    screenWidth: this.props.screenWidth,
    isMobile: this.props.isMobile
  };
  moreProjects = () => {
    this.setState({
      extraProject: true
    });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.screenWidth !== prevProps.screenWidth ||
      this.props.isMobile !== prevProps.isMobile
    ) {
      this.setState({
        screenWidth: this.props.screenWidth,
        isMobile: this.props.isMobile
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
          <Row type="flex" justify="center" align="middle">
            <Col>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={item => (
                  <Fragment>
                    <div>
                      {this.state.screenWidth < 769 ||
                      this.state.isMobile === true ? (
                        <Image
                          src={item.image}
                          onClick={() => console.log("onClick")}
                          aspectRatio={16 / 9}
                          disableSpinner
                        />
                      ) : null}
                    </div>
                    <List.Item
                      key={item.title.name}
                      actions={[
                        <Row type="flex" justify="space-between" align="middle">
                          <Fragment>
                            <Col span={4}>
                              <Tooltip title="Learn More">
                                <a href={`#${item.id}`} disabled>
                                  <Icon
                                    type="more"
                                    style={{ fontSize: this.state.fontSize }}
                                    rotate="90"
                                  />
                                </a>
                              </Tooltip>
                            </Col>
                            {item.links.map((link, index) => {
                              return (
                                <Col span={4}>
                                  <Tooltip title={link.prompt}>
                                    <a
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Icon
                                        type={link.type}
                                        style={{
                                          fontSize: this.state.fontSize
                                        }}
                                      />
                                    </a>
                                  </Tooltip>
                                </Col>
                              );
                            })}
                          </Fragment>
                        </Row>
                      ]}
                      extra={
                        this.state.screenWidth > 768 &&
                        this.state.isMobile === false ? (
                          <a href={item.links[0].href}>
                            <img
                              style={{ width: "13vw" }}
                              alt="logo"
                              src={item.image}
                            />
                          </a>
                        ) : null
                      }
                    >
                      <List.Item.Meta
                        title={
                          <a href={item.title.href}> {item.title.name} </a>
                        }
                        description={`${item.position} | From ${item.startDate} to ${item.endDate} in ${item.location}`}
                      />
                      {item.description.map((description, index) => {
                        return <p>{description}</p>;
                      })}
                      {item.languages != null ? (
                        <p>
                          <b>{`Languages used ${item.languages}`}</b>
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </List.Item>
                  </Fragment>
                )}
              ></List>
            </Col>
          </Row>
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
