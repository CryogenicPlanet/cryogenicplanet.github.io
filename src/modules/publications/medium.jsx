import React, { Component, Fragment } from "react";
import { Row, Col, Typography } from "antd";

const {Title} =  Typography
class Medium extends Component {
  render() {
    return (
    <Fragment>
        
      <Row>
        <Col>
          <blockquote className="embedly-card" data-card-theme="dark">
            <h4>
              <a href="https://medium.com/etwas/higher-order-numeric-differential-equations-python-bc23dd148a0b">
                Higher Order Numeric Differential Equations(Python)
              </a>
            </h4>
            <p>
              This post shows how to solve Differential Equations using Higher
              Order Methods in Python, to minimize the truncation error and
              converge faster. By the nature of the topic, it is expected to
              have an understanding of calculus and of basic programming to
              achieve this.
            </p>
          </blockquote>
          <script
            async
            src="//cdn.embedly.com/widgets/platform.js"
            charset="UTF-8"
          ></script>
        </Col>
        <Col>
          <blockquote className="embedly-card" data-card-theme="dark">
            <h4>
              <a href="https://medium.com/etwas/creating-smart-home-devices-using-ifttt-and-arduino-8a3506168705">
                Creating Smart Home Devices using IFTTT and Arduino
              </a>
            </h4>
            <p>
              Note: If using the Wesmos D1 for this project, follow this link to
              add the board to the Arduino IDE There is very minimal programming
              required for this project and if you copy the below source code
              you will at maximum have to change two or three lines to get the
              system working.
            </p>
          </blockquote>
          <script
            async
            src="//cdn.embedly.com/widgets/platform.js"
            charset="UTF-8"
          ></script>
        </Col>
      </Row>
      </Fragment>
    );
  }
}

export default Medium;
