/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Typewriter from "./animation/typewriter";
import { Col, Row, Card, Avatar } from "antd";

type AboutProps = { screenWidth: number, isMobile: boolean }
class About extends Component<AboutProps> {
  state = {
    screenWidth: this.props.screenWidth,
    isMobile: this.props.isMobile
  };
  componentDidUpdate(prevProps: AboutProps) {
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
      // @ts-ignore
      <Card name="about" style={{ background: "#212121", borderWidth: "0" }}>
        {this.state.screenWidth > 768 ? (
          <Row type="flex" justify="start" align="middle">

            <Col>
              <Typewriter
                screenWidth={this.state.screenWidth}
                isMobile={this.state.isMobile}
              ></Typewriter>
            </Col>
          </Row>
        ) : (
            <Row type="flex" justify="center" align="middle">
              <Col>
                <Typewriter
                  screenWidth={this.state.screenWidth}
                  isMobile={this.state.isMobile}
                ></Typewriter>
              </Col>
            </Row>
          )}
      </Card>
    );
  }
}

export default About;
