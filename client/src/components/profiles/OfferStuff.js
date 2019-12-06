import React, { Fragment } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const OfferStuff = props => {
  let stuff = <></>;
  if (props.offerStuff) {
    stuff = [...props.offerStuff].map((el, index) => {
      return (
        <Fragment key={index}>
          <Row>
            <Col>
              <li>{el}</li>
            </Col>
            {props.showOfferStuffForm && (
              <Col>
                <button onClick={() => props.deleteStuff(el)}>
                  {`\u00D7`}
                </button>
              </Col>
            )}
          </Row>
        </Fragment>
      );
    });
  }

  return (
    <Fragment className="mb-5">
      <h3 className="mt-5">
        I can lend...
        {props.sameUser && !props.showOfferStuffForm && (
          <Button
            onClick={() =>
              props.toggleForm({
                showOfferStuffForm: !props.showOfferStuffForm
              })
            }
            variant="outline-info"
          >
            {`\u270E`} Edit
          </Button>
        )}
      </h3>

      <ul>{stuff}</ul>

      {props.showOfferStuffForm && (
        <Form onSubmit={props.handleSubmitOfferStuff}>
          <Form.Group>
            <Form.Control
              type="text"
              name="stuffInput"
              onChange={props.handleChange}
              value={props.stuffInput}
            />
          </Form.Group>
          <Button type="submit" variant="outline-danger">
            Add
          </Button>
          <Button
            onClick={() =>
              props.toggleForm({
                showOfferStuffForm: !props.showOfferStuffForm
              })
            }
            variant="outline-danger"
          >
            Done
          </Button>
        </Form>
      )}
    </Fragment>
  );
};

export default OfferStuff;
// rafce
