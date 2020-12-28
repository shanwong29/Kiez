import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddPost extends Component {
  state = {
    description: "",
    imageUrl: "", //for future, if we want to add image to post
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const description = this.state.description;

    if (description.trim() === "") {
      return;
    }

    axios
      .post("/api/events", {
        description,
        type: "post",
        street: this.props.user.address.street,
        houseNumber: this.props.user.address.houseNumber,
        city: this.props.user.address.city,
        postalCode: this.props.user.address.postalCode,
        coordinates: this.props.user.address.coordinates,
        formattedAddress: this.props.user.address.formattedAddress,
        imageUrl:
          "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg",
      })
      .then(this.props.getAllEvents)
      .then(this.setState({ description: "" }))
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    const description = e.target.value;
    this.setState({
      description: description,
    });
  };

  render() {
    return (
      <div className="post-form">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="What do you want to tell to your neighbors?"
            />
          </Form.Group>
          <div className="flex-end-btn">
            <Button type="submit">Post</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default AddPost;
