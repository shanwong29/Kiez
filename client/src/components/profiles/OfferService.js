import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

// user={this.props.user}
// profileOwnerUserName={this.state.username}
// offerService={this.state.offerService}
// showOfferServiceForm={this.state.showOfferServiceForm}
// toggleEditAboutMe={this.toggleEditAboutMe}
// handleChange={this.handleChange}
// cancel={this.cancel}
// updateAboutMe={this.updateAboutMe}

export default class OfferService extends Component {
  render() {
    let services = <></>;
    if (this.props.offerService) {
      services = [...this.props.offerService].map((el, index) => {
        return (
          <>
            <Row key={index}>
              <Col>
                <li key={index}>{el}</li>
              </Col>
              {this.props.showOfferServiceForm && (
                <Col>
                  <button onClick={this.props.deleteService}>{`\u00D7`}</button>
                </Col>
              )}
            </Row>
          </>
        );
      });
    }

    console.log(services);
    console.log(this.props.offerService);

    return (
      <div>
        <h3 className="mt-5">
          I can help...{" "}
          {this.props.sameUser && !this.props.showOfferServiceForm && (
            <Button
              onClick={this.props.toggleOfferServiceForm}
              variant="outline-info"
            >
              {`\u270E`} Edit
            </Button>
          )}
          {this.props.sameUser && this.props.showOfferServiceForm && (
            <Button
              onClick={this.props.cancelServiceChanges}
              variant="outline-danger"
            >
              Cancel
            </Button>
          )}
        </h3>

        <ul>{services}</ul>

        {this.props.showOfferServiceForm && (
          <Form onSubmit={this.props.handleSubmitOfferService}>
            <Form.Group>
              <Form.Control
                type="text"
                name="serviceInput"
                onChange={this.props.handleChangeOfferService}
                value={this.props.serviceInput}
              />
            </Form.Group>
            <Button type="submit" variant="outline-danger">
              Add
            </Button>
            <Button
              onClick={this.props.toggleOfferServiceForm}
              variant="outline-danger"
            >
              Done
            </Button>
          </Form>
        )}
      </div>
    );
  }
}
