import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Newsfeed extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div className="container">
        <Button>
          {/* <Link to={`/events/myevents/${this.props.user._id}`}>My events</Link> */}
          <Link className="event-links" to={`/events/myevents`}>My events</Link>
        </Button>
        <Button>
          <Link className="event-links" to={`/events/going`}>Events I´m going</Link>
        </Button>

        <h1>Newsfeed</h1>
      </div>
    );
  }
}
