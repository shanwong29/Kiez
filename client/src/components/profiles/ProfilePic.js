import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ProfilePic extends Component {
  render() {
    return (
      <>
        <img
          className="user-pic"
          src={this.props.imageUrl}
          alt=""
          width="300"
        />
        {this.props.sameUser && (
          <form onSubmit={this.props.handleSubmitFile}>
            <input
              type="file"
              id="pic-input"
              onChange={this.props.handleFileUpload}
            />
            <Button type="submit" variant="outline-info">
              Upload
            </Button>
          </form>
        )}
        {/* {this.props.photoMessage && <p>{this.props.photoMessage}</p>} */}
      </>
    );
  }
}
