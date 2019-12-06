import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ProfilePic extends Component {
  render() {
    return (
      <>
        <img src={this.props.imageUrl} alt="" width="300" />
        {this.props.user.username === this.props.profileOwnerUserName && (
          <form onSubmit={this.props.handleSubmitFile}>
            <input type="file" onChange={this.props.handleFileUpload} />
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
