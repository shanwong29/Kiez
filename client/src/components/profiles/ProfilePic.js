import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

//   user={this.props.user}
// profileOwnerUserName={this.state.username}
// imageUrl={this.state.imageUrl}
// handleFileUpload={this.handleFileUpload}
// handleSubmitFile={this.handleSubmitFile}

export default class ProfilePic extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <img src={this.props.imageUrl} alt="" width="300" />
        {this.props.user.username === this.props.profileOwnerUserName && (
          <form onSubmit={this.props.handleSubmitFile}>
            <input type="file" onChange={this.props.handleFileUpload} />
            <Button type="submit" variant="outline-info">
              Upload Photo
            </Button>
          </form>
        )}
      </>
    );
  }
}
