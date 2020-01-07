import React from "react";
import EventOverview from "./EventOverview";
import { futureEventCheck } from "../../services/general-functions.js";

const MyEvents = props => {
  let myEvents = (
    <div>
      <h1>My Created Events</h1>
      <h3 class="event-list-h3">Upcoming Events: </h3>
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
          //console.log("DATE:", new Date(a.date), new Date(a.date) - new Date(b.date));
          return new Date(a.date) - new Date(b.date);
        })
        .map(event => {
          return <EventOverview event={event} />;
        })}
    </div>
  );

  let pastEvents = (
    <div>
      <h3 class="event-list-h3">Past Events: </h3>
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
          //console.log("DATE:", new Date(a.date), new Date(a.date) - new Date(b.date));
          return new Date(b.date) - new Date(a.date);
        })
        .map(event => {
          return <EventOverview event={event} />;
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

export default MyEvents;
