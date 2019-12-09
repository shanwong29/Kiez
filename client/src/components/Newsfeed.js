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
          <Link to={`/events/myevents`}>My events</Link>
        </Button>

        <h1>Newsfeed</h1>
      </div>
    );
  }
}
