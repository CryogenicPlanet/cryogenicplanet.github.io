/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Typewriter } from "./animation/animation";
import { Col, Row, Card, Avatar } from "antd";
class about extends Component {
  state = {
    screenwidth: this.props.screenwidth,
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
      <Card name="about" style={{ background: "#212121", borderWidth: "0" }}>
        {this.state.screenwidth > 768 ? (
          <Row type="flex" justify="start" align="middle">
            <Col span={4}>
              <Avatar
                shape="circle"
                size="large"
                src="https://media-exp1.licdn.com/dms/image/C5603AQF1mEw-2pegDA/profile-displayphoto-shrink_200_200/0?e=1585785600&v=beta&t=8QBkmGIG71kSc6x3d44P22ko7se4AvB5l36Hb5ySD-k"
              />
            </Col>

            <Col>
              <Typewriter
                screenwidth={this.state.screenwidth}
                isMobile={this.state.isMobile}
              ></Typewriter>
            </Col>
          </Row>
        ) : (
          <Row type="flex" justify="center" align="middle">
            <Col>
              <Typewriter
                screenwidth={this.state.screenwidth}
                isMobile={this.state.isMobile}
              ></Typewriter>
            </Col>
          </Row>
        )}
      </Card>
    );
  }
}

export default about;
