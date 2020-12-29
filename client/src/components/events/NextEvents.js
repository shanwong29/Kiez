import React, { useState, useEffect } from "react";
import EventOverview from "./EventOverview";
import axios from "axios";

const NextEvents = (props) => {
  const [upComingEvents, setUpComingEvents] = useState([]);

  useEffect(() => {
    getUpComingEvents();
  }, []);

  const getUpComingEvents = () => {
    axios
      .get("/api/events/myevents", {
        params: {
          type: "nextEvents",
          loggedInUserCoordinates: props.user.address.coordinates,
        },
      })
      .then((response) => {
        setUpComingEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let nextEvents = (
    <div>
      <h1 className="h1-heading">Upcoming Events in your Neighborhood</h1>

      {upComingEvents.map((event, index) => {
        return <EventOverview key={index} event={event} />;
      })}
    </div>
  );
  return <div>{nextEvents}</div>;
};

export default NextEvents;
