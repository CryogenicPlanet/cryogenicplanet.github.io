/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import data from "./data";
import { Col, Row, List, Typography, Icon, Tooltip } from "antd";
//import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Title } = Typography;

class Experience extends Component {
  state = {
    fontSize: this.props.fontSize,
  };
  componentDidUpdate(prevProps) {
    if (this.props.fontSize !== prevProps.fontSize) {
      this.setState({
        fontSize: this.props.fontSize,
      });
    }
  }
  render() {
    return (
      <section color="black">
        <Row type="flex" justify="center" align="middle">
          <Title>Work Experiences</Title>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title.name}
                  actions={[
                    <Row type="flex" justify="space-between" align="middle">
                      <Fragment>
                        <Col span={4}>
                          <Tooltip title="Learn More">
                            <a href={`#${item.title.name}`} disabled>
                              <Icon
                                type="more"
                                style={{ fontSize: this.state.fontSize }}
                                rotate="90"
                              />
                            </a>
                          </Tooltip>
                        </Col>
                        {item.links.map((link) => {
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
                                    style={{ fontSize: this.state.fontSize }}
                                  />
                                </a>
                              </Tooltip>
                            </Col>
                          );
                        })}
                      </Fragment>
                    </Row>,
                  ]}
                  extra={
                    <a href={item.links[0].href}>
                      <img
                        style={{ width: "13vw" }}
                        alt="logo"
                        src={`${process.env.PUBLIC_URL}/images/experiences/${item.image}`}
                      />
                    </a>
                  }
                >
                  <List.Item.Meta
                    title={<a href={item.title.href}> {item.title.name} </a>}
                    description={`${item.position} | From ${
                      item.startDate
                    } to ${item.endDate} ${
                      item.location === "Remote"
                        ? "| Remote"
                        : "in " + item.location
                    }`}
                  />
                  {item.description.map((description) => {
                    return <p>{description}</p>;
                  })}
                  {item.languages ? (
                    <p>
                      <b>{`Languages used ${item.languages}`}</b>
                    </p>
                  ) : (
                    <p></p>
                  )}
                </List.Item>
              )}
            ></List>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Experience;
