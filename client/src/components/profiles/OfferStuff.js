import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";

const OfferStuff = props => {
  let stuff = <></>;
  if (props.offerStuff) {
    stuff = [...props.offerStuff].map((el, index) => {
      return (
        <Fragment key={index}>
          <div className="help-item-list">
            <li>
              <span className="mr-2 toolbox">
                <i className="fas fa-toolbox"></i>{" "}
              </span>{" "}
              <span>{el}</span>
            </li>

            {props.showOfferStuffForm && (
              <button onClick={() => props.deleteStuff(el)}>{`\u00D7`}</button>
            )}
          </div>
        </Fragment>
      );
    });
  }

  return (
    <div className="my-md-5">
      <h3 class="profile-detail-subhead">
        I can lend...{" "}
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

      <ul className="pl-0" style={{ listStyleType: "none" }}>
        {stuff}
      </ul>

      {props.showOfferStuffForm && (
        <Form onSubmit={props.handleSubmitOfferStuff}>
          <Form.Group>
            <Form.Control
              type="text"
              name="stuffInput"
              id="stuff-input"
              onChange={props.handleChange}
              value={props.stuffInput}
            />
          </Form.Group>
          <div className="add-service-stuff-btn">
            <Button type="submit" variant="outline-success" className="mr-2">
              Add
            </Button>
            <Button
              onClick={() =>
                props.toggleForm({
                  showOfferStuffForm: !props.showOfferStuffForm
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
};

export default OfferStuff;
// rafce
