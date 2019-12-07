import React from "react";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-stars";

let newRating = 0;

const ratingChanged = rating => {
  console.log("In ratingchanged Function", rating);
  newRating = rating;
};

const Reference = props => {
  return (
    <>
      <h3 className="mt-5">
        Reference{" "}
        {!props.sameUser && !props.showReferenceForm && props.user && (
          <Button
            onClick={() =>
              props.toggleForm({
                showReferenceForm: !props.showReferenceForm
              })
            }
            variant="outline-info"
          >
            {`\u270E`} Add a reference
          </Button>
        )}
      </h3>

      {props.showReferenceForm && (
        <Container>
          <Form>
            {/* <Form onSubmit={props.addReference}> */}
            {props.showReferenceAlert && (
              <Alert variant="danger">
                IMPORTANT!!
                <br />
                Are you sure you want to submit this reference?
                <br />
                Submitted reference CANNOT be modified or deleted.
                <br />
                <Button
                  onClick={props.cancelReferenceChange}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
                {/* <Button type="submit" variant="outline-danger"> */}
                <Button
                  onClick={() => props.addReference(newRating)}
                  variant="outline-danger"
                >
                  Confirm
                </Button>
              </Alert>
            )}

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Give Credits to this user (optional) :
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="creditInput"
                    placeholder="Write a number"
                    onChange={props.handleChange}
                    value={props.creditInput}
                  />
                </Form.Group>
              </Col>
              <Col md={1}></Col>
              <Col md={5}>
                <Form.Label>Rating :</Form.Label>
                <ReactStars
                  value={props.rating}
                  count={5}
                  // onChange={props.handleRefchange}
                  onChange={ratingChanged}
                  size={30}
                  color2={"#ffd700"}
                />
              </Col>
            </Row>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                name="referenceInput"
                onChange={props.handleChange}
                value={props.referenceInput}
                placeholder="Write your reference here"
              />
            </Form.Group>
            {!props.showReferenceAlert && (
              <>
                {" "}
                <Button
                  onClick={props.cancelReferenceChange}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => props.firstAddRef(newRating)}
                  variant="outline-danger"
                >
                  Add
                </Button>
              </>
            )}
          </Form>
        </Container>
      )}
    </>
  );
};

export default Reference;
