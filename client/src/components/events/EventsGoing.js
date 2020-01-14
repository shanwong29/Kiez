import React from "react";
import EventOverview from "./EventOverview";
import {
  futureEventCheck,
  getDateWithTime
} from "../../services/general-functions.js";

const EventsGoing = props => {
  let eventsGoing = (
    <div>
      <h1 className="h1-heading">Events I´m Joining</h1>
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
          let dateA = getDateWithTime(a.date, a.time);
          let dateB = getDateWithTime(b.date, b.time);
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
        .map((event, index) => {
          return <EventOverview key={index} event={event} />;
        })}
    </div>
  );

  return <div>{eventsGoing}</div>;
};

export default EventsGoing;
