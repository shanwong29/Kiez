import React, { Fragment } from "react";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import ReactStars from "react-stars";
import ReferenceCard from "./ReferenceCard";

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
      <Container>
        {props.showReferenceForm && !props.sameUser && (
          <Fragment>
            {props.showNotEnoughCredit && (
              <Alert variant="warning">
                Your credit: {props.authorCredits}
                <br />
                You don't have enough credit to transfer.
              </Alert>
            )}

            {props.showNeedtoWriteSth && (
              <Alert variant="warning">You need to write something.</Alert>
            )}

            <Row className="my-3">
              <Col className="mr-2" xs={2} lg={1}>
                <img
                  className="user-pic mt-1"
                  src={props.user.imageUrl}
                  alt="auth picture"
                  width="40"
                />
              </Col>
              <Col>
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
                      {/* <Button type="submit" variant="outline-danger"> */}
                      <Button
                        onClick={() => props.addReference(newRating)}
                        variant="outline-success"
                        className="mt-3"
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() =>
                          props.toggleForm({ showReferenceAlert: false })
                        }
                        variant="outline-danger"
                        className="mt-3 mx-2"
                      >
                        Cancel
                      </Button>
                    </Alert>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Give Credits to <strong>{props.profileOwner}</strong>{" "}
                          (optional) :
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="creditInput"
                          placeholder="Write a number"
                          onChange={props.handleCreditChange}
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
                        half={false}
                        color2={"#ffd700"}
                      />
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="referenceInput"
                      onChange={props.handleRefChange}
                      value={props.referenceInput}
                      placeholder="Write your reference here"
                    />
                  </Form.Group>
                  {!props.showReferenceAlert && (
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => props.firstAddRef(newRating)}
                        variant="outline-success"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={props.cancelReferenceChange}
                        variant="outline-danger"
                        className="mx-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>
          </Fragment>
        )}
        <ReferenceCard reference={props.reference} />
      </Container>
    </>
  );
};

export default Reference;
