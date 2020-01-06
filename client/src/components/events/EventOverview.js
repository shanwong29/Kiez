import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const EventOverview = props => {
  let numOfPplGoingDisplay = "";
  if (props.event.join.length === 1) {
    numOfPplGoingDisplay = `\u2022 ${props.event.join.length} person is going \u2022`;
  }
  if (props.event.join.length > 1) {
    numOfPplGoingDisplay = `\u2022 ${props.event.join.length} people are going \u2022`;
  }
  let eventOverview = (
    <Container className="event-details">
      <Row>
        <Col>
          <img src={props.event.imageUrl} width="80%" alt={props.event.name} />
        </Col>
        <Col sm={6} className="event-info-container">
          <Link
            to={`/events/${props.event._id}`}
            key={props.event._id}
            className="event-overview-text"
          >
            <h2>{props.event.name}</h2>
            <div className="date">
              <h5>
                {props.event.date.slice(0, 10)} at {props.event.time}
              </h5>
              <h5>{props.event.address.formattedAddress}</h5>
            </div>

            <h5>{numOfPplGoingDisplay}</h5>
          </Link>
        </Col>
      </Row>
    </Container>
  );

  return eventOverview;
};

export default EventOverview;
