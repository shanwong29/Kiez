import React from "react";
import { Button, Form } from "react-bootstrap";

const Reference = props => {
  return (
    <>
      <h3 className="mt-5">
        Reference{" "}
        {!props.sameUser && !props.showReferenceForm && (
          <Button
            onClick={() =>
              props.toggleForm({
                showReferenceForm: !props.showReferenceForm
              })
            }
            variant="outline-info"
          >{`\u270E`}</Button>
        )}
      </h3>

      {props.showReferenceForm && (
        <Form onSubmit={props.addReference}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              name="referenceInput"
              onChange={props.handleChange}
              value={props.referenceInput}
            />
          </Form.Group>
          <Button onClick={props.cancelRefernceChange} variant="outline-danger">
            Cancel
          </Button>
          <Button type="submit" variant="outline-danger">
            Add
          </Button>
        </Form>
      )}
    </>
  );
};

export default Reference;
