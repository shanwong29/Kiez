import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class EventPage extends Component {


  render() {
    return (
      <div className="container">
        <Button>
          {/* <Link to={`/events/myevents/${this.props.user._id}`}>My events</Link> */}
          <Link to={`/events/myevents/something`}>My events</Link>

        </Button>

        <h1>EventPage</h1>
      </div>
    );
  }
}
