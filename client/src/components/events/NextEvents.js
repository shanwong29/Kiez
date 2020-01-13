import React from "react";
import EventOverview from "./EventOverview";
import { distance } from "../../services/distance";
import {
  futureEventCheck,
  getDateWithTime
} from "../../services/general-functions.js";

//// Filter for distaance!!!!!!!!!!!!!!!!!!!!

const NextEvents = props => {
  let nextEvents = (
    <div>
      <h1 className="h1-heading">Upcoming Events in your Neighborhood</h1>

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
          let dateA = getDateWithTime(a.date, a.time);
          let dateB = getDateWithTime(b.date, b.time);
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
        })
        .map(event => {
          return <EventOverview event={event} />;
        })}
    </div>
  );
  return <div>{nextEvents}</div>;
};

export default NextEvents;
