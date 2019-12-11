import React from "react";
import EventOverview from "./EventOverview"


const MyEvents = props => {
  console.log("USER:", props.user._id);

  let myEvents = (
    <div>
      <h1>My Events: </h1>
      {props.state.allEvents
        .filter(
          event =>
            event.creater._id === props.user._id && 
            new Date(event.date) > new Date() &&
            event.type === "event"
        )
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
          return <EventOverview event={event}/>
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
