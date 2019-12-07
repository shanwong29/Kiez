import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

{
  /* .sort(function(a, b) {
          console.log("DATE:", new Date(a.date) - new Date(b.date));
          return a.date - b.date;
        }) */
}

const EventList = props => {
  console.log("PROPS EVENTS:", props);

  let myEvents = (
    <div>
      <h1>My Events: </h1>
      {props.state.allEvents
        .filter(
          event =>
            event.creater === props.state.user._id &&
            new Date(event.date) > new Date() &&
            event.type === "event"
        )
        .sort(function(a, b) {
          //console.log("DATE:", new Date(a.date), new Date(a.date) - new Date(b.date));
          return new Date(a.date) - new Date(b.date);
        })
        .map(event => {
          console.log(
            "Order:",
            new Date(event.date),
            new Date(),
            new Date(event.date) > new Date()
          );

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
                    <h4>
                      {event.address.street} {event.address.houseNumber},{" "}
                      {event.address.city}
                    </h4>
                    <p>{event.description}</p>
                  </Col>
                </Row>
              </Container>
            </Link>
          );
        })}
    </div>
  );

  let pastEvents = (
    <div>
      <h1>Past Events: </h1>
      {props.state.allEvents
        .filter(
          event =>
            event.creater === props.state.user._id &&
            new Date(event.date) < new Date()
        )
        .sort(function(a, b) {
          //console.log("DATE:", new Date(a.date), new Date(a.date) - new Date(b.date));
          return new Date(b.date) - new Date(a.date);
        })
        .map(event => {
          console.log(
            "Order:",
            new Date(event.date),
            new Date(),
            new Date(event.date) > new Date()
          );

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
                      {event.date} at {event.time}
                    </h4>
                    <h4>
                      {event.address.street} {event.address.houseNumber},{" "}
                      {event.address.city}
                    </h4>
                    <p>{event.description}</p>
                  </Col>
                </Row>
              </Container>
            </Link>
          );
        })}
    </div>
  );

  return (
    <div>
      <div>
        {myEvents} {pastEvents}
      </div>
    </div>
  );
};

export default EventList;
