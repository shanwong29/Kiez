import React, { Component, Fragment } from "react";
// import { Button } from "react-bootstrap";

export default class EventPic extends Component {
  render() {
    return (
      <Fragment>
        <img src={this.props.imageUrl} alt="" width="300" />
        <input type="file" onChange={this.props.handleFileUpload} />
      </Fragment>
    );
  }
}
