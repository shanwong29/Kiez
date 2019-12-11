import React, { Component } from "react";
import AddPost from "../posts/AddPost";
import PostList from "../posts/PostList";

class Newsfeed extends Component {
  render() {
    return (
      <>
        <AddPost user={this.props.user} getAllEvents={this.props.getAllEvents}/>
        <PostList getAllEvents={this.props.getAllEvents} allEvents={this.props.allEvents} user={this.props.user}/>
      </>
    );
  }
}

export default Newsfeed;
