import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import EventOverview from "./EventOverview";

const EventsGoing = props => {
  console.log("ALL EVENTS:", props.allEvents[0]);

  let eventsGoing = (
    <div>
      <h1>Events I´m going:</h1>
      {props.allEvents
        .filter(
          event => event.join.includes(props.user._id) && event.type === "event"
        )
        .sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map(event => {
          return <EventOverview event={event} />;
        })}
    </div>
  );

  return <div>{eventsGoing}</div>;
};

export default EventsGoing;
