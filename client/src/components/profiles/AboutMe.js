import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class AboutMe extends Component {
  render() {
    return (
      <>
        <h5 className="mt-5 mb-2">
          About Me{" " + "\u0020"}
          {this.props.state.username === this.props.user.username &&
            !this.props.state.editAboutMe && (
              <Button
                onClick={this.props.toggleEditAboutMe}
                variant="outline-info"
              >{`\u270E`}</Button>
            )}
        </h5>

        {this.props.state.editAboutMe && (
          <Form onSubmit={this.props.updateAboutMe}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                name="aboutMe"
                onChange={this.props.handleChange}
              />
            </Form.Group>
            <Button onClick={this.props.cancel} variant="outline-danger">
              Cancel
            </Button>
            <Button type="summit" variant="outline-danger">
              Add
            </Button>
          </Form>
        )}
        {!this.props.state.editAboutMe && (
          <p className="mt-3 mb-5">
            {this.props.state.aboutMe &&
              this.props.state.aboutMe.split("\n").map((item, index) => {
                return (
                  <span key={index}>
                    {item}
                    <br />
                  </span>
                );
              })}
          </p>
        )}
      </>
    );
  }
}
