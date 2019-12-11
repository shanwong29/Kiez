import React from "react";
import EventOverview from "./EventOverview"
import { distance } from "../../services/distance";

//// Filter for distaance!!!!!!!!!!!!!!!!!!!!

const NextEvents = props => {
  let nextEvents = (
    <>
      <div>
        <h1>Next events in your neighborhood</h1>

        {props.state.allEvents
          .filter(
            event =>
             (  distance(props.user.address.coordinates, event.address.coordinates) < 3 ) &&
              new Date(event.date) > new Date() &&
              event.type === "event"
          )
          .sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
          })
          .map(event => {
            return <EventOverview event={event}/>
          })}
      </div>
    </>
  );
  return <div>{nextEvents}</div>;
};

export default NextEvents;
