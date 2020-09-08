import React, { Component } from "react";
import Loading from "react-loading-spinkit";

class Loader extends Component {
  render() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Loading
          // eslint-disable-next-line react/prop-types
          show={this.props.show}
          name="pacman"
          color="rgba(255, 255, 255, 1)"
        ></Loading>
      </div>
    );
  }
}

export default Loader;
