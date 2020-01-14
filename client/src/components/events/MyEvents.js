import React from "react";
import EventOverview from "./EventOverview";
import {
  futureEventCheck,
  getDateWithTime
} from "../../services/general-functions.js";

const MyEvents = props => {
  let myEvents = (
    <div>
      <h1 className="h1-heading">My Created Events</h1>
      <h3 className="event-list-h3">Upcoming Events: </h3>
      {props.state.allEvents
        .filter(event => {
          let isFutureEvent = futureEventCheck(event.date, event.time);
          return (
            event.creater._id === props.user._id &&
            isFutureEvent &&
            event.type === "event"
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

  let pastEvents = (
    <div>
      <h3 className="event-list-h3">Past Events: </h3>
      {props.state.allEvents
        .filter(event => {
          let isFutureEvent = futureEventCheck(event.date, event.time);
          return (
            event.creater._id === props.state.user._id &&
            !isFutureEvent &&
            event.type === "event"
          );
        })
        .sort(function(a, b) {
          let dateA = getDateWithTime(a.date, a.time);
          let dateB = getDateWithTime(b.date, b.time);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        })
        .map((event, index) => {
          let pastEvent = true;
          return (
            <EventOverview key={index} pastEvent={pastEvent} event={event} />
          );
        })}
    </div>
  );

  return (
    <div>
      {myEvents} {pastEvents}
    </div>
  );
};

export default MyEvents;
