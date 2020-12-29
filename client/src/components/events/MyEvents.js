import React, { useState, useEffect } from "react";
import EventOverview from "./EventOverview";
import axios from "axios";

const MyEvents = (props) => {
  const [myCreatedEvents, setMyCreatedEvents] = useState({
    myPastEvents: [],
    myFutureEvents: [],
  });

  useEffect(() => {
    getMyEvent("myPastEvents");
    getMyEvent("myFutureEvents");
  }, []);

  const getMyEvent = (type) => {
    axios
      .get("/api/events/myevents", {
        params: {
          type,
          loggedInUserCoordinates: {},
        },
      })
      .then((response) => {
        setMyCreatedEvents({ ...myCreatedEvents, [type]: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let myEvents = (
    <div>
      <h1 className="h1-heading">My Created Events</h1>
      <h3 className="event-list-h3">Upcoming Events: </h3>
      {myCreatedEvents.myFutureEvents.map((event, index) => {
        return <EventOverview key={index} event={event} />;
      })}
    </div>
  );

  let pastEvents = (
    <div>
      <h3 className="event-list-h3">Past Events: </h3>
      {myCreatedEvents.myPastEvents.map((event, index) => {
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
