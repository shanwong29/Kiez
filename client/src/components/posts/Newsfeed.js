import React, { Component } from "react";
import AddPost from "../posts/AddPost";
import PostList from "../posts/PostList";
import axios from "axios";

class Newsfeed extends Component {
  state = {
    allPosts: [],
  };

  getAllPosts = () => {
    axios
      .get("/api/events/myevents", {
        params: {
          type: "post",
          loggedInUserCoordinates: this.props.user.address.coordinates,
        },
      })
      .then((response) => {
        this.setState({
          allPosts: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllPosts();
  }
  render() {
    return (
      <>
        <AddPost user={this.props.user} getAllPosts={this.getAllPosts} />
        <PostList
          getAllPosts={this.getAllPosts}
          allPosts={this.state.allPosts}
          user={this.props.user}
        />
      </>
    );
  }
}

export default Newsfeed;
