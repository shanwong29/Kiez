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
            <Row>
              <Col>
                <li>{el}</li>
              </Col>
              {this.props.showOfferServiceForm && (
                <Col>
                  <button
                    onClick={() => this.props.deleteService({ el })}
                  >{`\u00D7`}</button>
                </Col>
              )}
            </Row>
          </Fragment>
        );
      });
    }

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
          {/* {this.props.sameUser && this.props.showOfferServiceForm && (
            <Button
              onClick={this.props.cancelServiceChanges}
              variant="outline-danger"
            >
              Cancel
            </Button>
          )} */}
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
