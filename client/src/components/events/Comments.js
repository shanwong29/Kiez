import React, { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment"

class Comments extends Component {
  render() {
    return(
      <>
      {/* { <CommentList user={this.props.user}/> */}
      { <AddComment user={this.props.user}/> } 
      </>
    )
  }
}

export default Comments;