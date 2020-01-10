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
    <Container className="event-details" key={props.event._id}>
      <Link to={`/events/${props.event._id}`} className="event-overview-text">
        <Row>
          <Col xs={12} md={5} id="event-img-container">
            <img
              src={props.event.imageUrl}
              width="90%"
              alt={props.event.name}
            />
          </Col>
          <Col xs={12} md={7} id="event-info-container">
            <h2 className="event-overview-heading h2-heading">
              {props.event.name}
            </h2>
            <div className="date">
              <h5 className="sub-heading">
                {props.event.date.slice(0, 10)} at{" "}
                {props.event.time.slice(0, 5)}
              </h5>
              <h5 className="sub-heading">
                {props.event.address.formattedAddress}
              </h5>
            </div>

            <h5 className="overview-host-info">
              <img
                src={props.event.creater.imageUrl}
                width="30"
                height="30"
                className="user-pic mx-1"
                alt={props.event.creater.username}
              />
              {props.event.creater.username} is hosting&nbsp;
              {numOfPplGoingDisplay}
            </h5>
          </Col>
        </Row>
      </Link>
    </Container>
  );

  return eventOverview;
};

export default EventOverview;
