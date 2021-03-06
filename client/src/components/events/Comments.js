import React, { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

class Comments extends Component {
  render() {
    return (
      <>
        <CommentList
          user={this.props.user}
          event={this.props.event}
          getSingleEvent={this.props.getSingleEvent}
        />
        <AddComment
          user={this.props.user}
          eventId={this.props.eventId}
          getSingleEvent={this.props.getSingleEvent}
        />
      </>
    );
  }
}

export default Comments;
