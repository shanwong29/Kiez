import React, { Component, Fragment } from "react";

export default class EventPic extends Component {
  render() {
    return (
      <Fragment>
        <img src={this.props.imageUrl} alt="event-img" width="100%" />
        <input type="file" onChange={this.props.handleFileUpload} />
      </Fragment>
    );
  }
}
