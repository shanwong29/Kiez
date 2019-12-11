import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const EventOverview = props => {
  let eventOverview = (
    <Container className="event-details">
      <Row>
        <Col>
          <img src={props.event.imageUrl} width="90%" alt={props.event.name} />
        </Col>
        <Col sm={6} className="event-info-container">
          <Link to={`/events/${props.event._id}`} key={props.event._id} className="event-overview-text">
            <h1>{props.event.name}</h1>
            <h4>
              {props.event.date.slice(0, 10)} at {props.event.time}
            </h4>
            <h4>{props.event.address.formattedAddress},</h4>
          </Link>
        </Col>
      </Row>
    </Container>
  );

  return eventOverview;
};

export default EventOverview;
