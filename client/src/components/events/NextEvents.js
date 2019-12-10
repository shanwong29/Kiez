import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const NextEvents = props => {
  let nextEvents = (
    <>
      <div>
        <h1>Next events in your neighborhood</h1>

        {props.state.allEvents
          .filter(
            event =>
              event.creater === props.user._id &&
              new Date(event.date) > new Date() &&
              event.type === "event"
          )
          .sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
          })
          .map(event => {
            return (
              <Link to={`/events/${event._id}`} key={event._id}>
                <Container className="event-details">
                  <Row>
                    <Col>
                      <img src={event.imageUrl} width="90%" alt={event.name} />
                    </Col>
                    <Col sm={6} className="event-info-container">
                      <h1>{event.name}</h1>
                      <h4>
                        {event.date.slice(0, 10)} at {event.time}
                      </h4>
                      <h4>{event.address.formattedAddress}</h4>
                    </Col>
                  </Row>
                </Container>
              </Link>
            );
          })}
      </div>
    </>
  );
  return <div>{nextEvents}</div>;
};

export default NextEvents;
