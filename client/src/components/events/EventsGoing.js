import React from "react";
import EventOverview from "./EventOverview";
import { futureEventCheck } from "../../services/general-functions.js";

const EventsGoing = props => {
  console.log("ALL EVENTS:", props.allEvents[0]);

  let eventsGoing = (
    <div>
      <h1 className="h1-heading">Events I´m joining:</h1>
      {props.allEvents
        .filter(event => {
          let isFutureEvent = futureEventCheck(event.date, event.time);
          return (
            event.join.includes(props.user._id) &&
            event.type === "event" &&
            isFutureEvent
          );
        })
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
