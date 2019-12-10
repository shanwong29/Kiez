import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const EventsGoing = props => {
  console.log("ALL EVENTS:", props.allEvents[0]);
  let eventsGoing = (
    <div>
      <h1>Events I´m going:</h1>
      {props.allEvents
        .filter(event => event.join.includes(props.user._id))
        .sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map(event => {
          let description = event.description;

          return (
            <Link to={`/events/${event._id}`} key={event._id}>
              <Container className="event-details">
                <Row>
                  <Col>
                    <img
                      src={event.imageUrl}
                      // height="100%"
                      width="90%"
                      alt={event.name}
                    />
                  </Col>
                  <Col sm={6} className="event-info-container">
                    <h1>{event.name}</h1>
                    <h4>
                      {event.date.slice(0, 10)} at {event.time}
                    </h4>
                    {/* <h4>
                      {event.address.street} {event.address.houseNumber},{" "}
                      {event.address.city}
                    </h4> */}
                    <h4>{event.address.formattedAddress},</h4>
                  </Col>
                </Row>
              </Container>
            </Link>
          );
        })}
    </div>
  );

  return <div>{eventsGoing}</div>;
};

export default EventsGoing;
