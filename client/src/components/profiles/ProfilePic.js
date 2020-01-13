import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ProfilePic extends Component {
  render() {
    return (
      <>
        <div class="profile-page-img-container">
          <img className="user-pic" src={this.props.imageUrl} alt="" />
          {this.props.canUpdateImg && <span>Preview</span>}
        </div>
        {this.props.sameUser && (
          <form onSubmit={this.props.handleSubmitFile}>
            <input
              type="file"
              id="pic-input"
              onChange={this.props.handleFileChange}
            />
            {this.props.canUpdateImg && (
              <Button type="submit" variant="outline-info">
                Upload
              </Button>
            )}
          </form>
        )}
        {this.props.photoMessage && (
          <p style={{ color: "red" }}>{this.props.photoMessage}</p>
        )}
      </>
    );
  }
}
