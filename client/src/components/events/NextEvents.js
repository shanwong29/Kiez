import React from "react";
import EventOverview from "./EventOverview";
import { distance } from "../../services/distance";
import { futureEventCheck } from "../../services/general-functions.js";

//// Filter for distaance!!!!!!!!!!!!!!!!!!!!

const NextEvents = props => {
  let nextEvents = (
    <div>
      <h1 className="h1-heading">Upcoming events in your neighborhood</h1>

      {props.state.allEvents
        .filter(event => {
          let isFutureEvent = futureEventCheck(event.date, event.time);
          return (
            distance(
              props.user.address.coordinates,
              event.address.coordinates
            ) < 3 &&
            isFutureEvent &&
            event.type === "event"
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
  return <div>{nextEvents}</div>;
};

export default NextEvents;
