import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export default class AboutMe extends Component {
  render() {
    return (
      <>
        <h5
          className="mt-md-5 mb-2 profile-detail-subhead"
          style={{ color: "grey" }}
        >
          About Me &nbsp;&nbsp;
          {this.props.sameUser && !this.props.state.showAboutMeForm && (
            <Button
              onClick={() =>
                this.props.toggleForm({
                  showAboutMeForm: !this.props.state.showAboutMeForm
                })
              }
              variant="outline-info"
            >{`\u270E`}</Button>
          )}
        </h5>

        {this.props.state.showAboutMeForm && (
          <Form onSubmit={this.props.updateAboutMe}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                name="aboutMe"
                onChange={this.props.handleChange}
                value={this.props.state.aboutMe}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="outline-success" className="mr-1">
                Add
              </Button>
              <Button
                onClick={this.props.cancelEditAboutMe}
                variant="outline-danger"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
        {!this.props.state.showAboutMeForm && (
          <p className="mt-3 mb-md-5">
            {this.props.state.aboutMe &&
              this.props.state.aboutMe
                .trim()
                .split("\n")
                .map((item, index) => {
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
