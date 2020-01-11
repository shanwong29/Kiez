import React, { Component, Fragment } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default class OfferService extends Component {
  render() {
    let services = <></>;

    // check if offerService is empty
    if (this.props.offerService) {
      services = [...this.props.offerService].map((el, index) => {
        return (
          <Fragment key={index}>
            <div className="help-item-list">
              <li>
                <span className="mr-2 help-item ">
                  <i className="fas fa-icons"></i>
                </span>{" "}
                <span>{el}</span>
              </li>

              {this.props.showOfferServiceForm && (
                <button
                  onClick={() => this.props.deleteService(el)}
                >{`\u00D7`}</button>
              )}
            </div>
          </Fragment>
        );
      });
    }

    return (
      <div className="my-md-5">
        <h3 class="profile-detail-subhead">
          I can help...{" "}
          {this.props.sameUser && !this.props.showOfferServiceForm && (
            <Button
              onClick={() =>
                this.props.toggleForm({
                  showOfferServiceForm: !this.props.showOfferServiceForm
                })
              }
              variant="outline-info"
            >
              {`\u270E`} Edit
            </Button>
          )}
        </h3>

        <ul className="pl-0" style={{ listStyleType: "none" }}>
          {services}
        </ul>

        {this.props.showOfferServiceForm && (
          <Form onSubmit={this.props.handleSubmitOfferService}>
            <Form.Group>
              <Form.Control
                id="help-input"
                type="text"
                name="serviceInput"
                onChange={this.props.handleChange}
                value={this.props.serviceInput}
              />
            </Form.Group>
            <div className="add-service-stuff-btn">
              <Button type="submit" variant="outline-success" className="mr-2">
                Add
              </Button>
              <Button
                onClick={() =>
                  this.props.toggleForm({
                    showOfferServiceForm: !this.props.showOfferServiceForm
                  })
                }
                variant="outline-info"
              >
                Done
              </Button>
            </div>
          </Form>
        )}
      </div>
    );
  }
}
