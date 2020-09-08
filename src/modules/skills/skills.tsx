/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from "react";
import { Row, Progress, Col, Typography, List } from "antd";
import data from "./data.json";
const { Title, Paragraph } = Typography;
class Skills extends Component<{ screenWidth: number, isMobile: boolean }> {
  state = {
    screenWidth: this.props.screenWidth,
    isMobile: this.props.isMobile
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
        <Row type="flex" justify="center" align="middle">
          <Title level={3}>Languages</Title>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          {data.languages.map((item) => {
            return (
              <Fragment>
                {this.state.screenWidth > 500 &&
                  this.state.isMobile === false ? (
                    <Col span={6} offset={3}>
                      <Progress
                        type="dashboard"
                        size="small"
                        percent={item.percent}
                        // eslint-disable-next-line no-unused-vars
                        format={percent => `${item.name}`}
                      />
                    </Col>
                  ) : (
                    <Col span={8}>
                      <Paragraph>{item.name}</Paragraph>
                      <Progress
                        type="line"
                        percent={item.percent}
                        // eslint-disable-next-line no-unused-vars
                        format={percent => ``}
                      />
                    </Col>
                  )}
              </Fragment>
            );
          })}
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Title level={3}>Frameworks</Title>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          {data.frameworks.map((item) => {
            return (
              <Fragment>
                <Col span={8}>
                  <Paragraph>{item.name}</Paragraph>
                  <Progress
                    type="line"
                    percent={item.percent}
                    // eslint-disable-next-line no-unused-vars
                    format={percent => ``}
                  />
                </Col>
              </Fragment>
            );
          })}
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ paddingTop: "2%" }}
        >
          <Title level={3}>Other</Title>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          {data.other.map((item) => {
            return (
              <Fragment>
                {this.state.screenWidth > 500 &&
                  this.state.isMobile === false ? (
                    <Col span={3}>
                      <Fragment>
                        <Paragraph>{item.name}</Paragraph>
                        <Progress
                          size="small"
                          percent={item.percent}
                          // eslint-disable-next-line no-unused-vars
                          format={percent => ``}
                        />
                      </Fragment>
                    </Col>
                  ) : (
                    <List size="small" bordered>
                      <List.Item>
                        <Row type="flex" justify="center" align="middle">
                          <Paragraph>{item.name}</Paragraph>
                        </Row>
                      </List.Item>
                    </List>
                  )}
              </Fragment>
            );
          })}
        </Row>
      </Fragment>
    );
  }
}
export default Skills;
