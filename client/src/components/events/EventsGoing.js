import React, { useState, useEffect } from "react";
import EventOverview from "./EventOverview";
import axios from "axios";

const EventsGoing = (props) => {
  const [myJoinedEvents, setMyJoinedEvents] = useState([]);

  useEffect(() => {
    getMyJoinedEvents();
  }, []);

  const getMyJoinedEvents = () => {
    axios
      .get("/api/events/myevents", {
        params: {
          type: "eventsGoing",
          loggedInUserCoordinates: {},
        },
      })
      .then((response) => {
        setMyJoinedEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let eventsGoing = (
    <div>
      <h1 className="h1-heading">Events I´m Joining</h1>
      {myJoinedEvents.map((event, index) => {
        return <EventOverview key={index} event={event} />;
      })}
    </div>
  );

  return <div>{eventsGoing}</div>;
};

export default EventsGoing;
