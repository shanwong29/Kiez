import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class AddPost extends Component {
  state = {
    // type: "post",
    description: ""
    // date: new Date()
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const description = this.state.description;

    axios
      .post("/api/events", {
        description,
        type: "post",
        date: new Date(),
        creater: this.props.user._id,
        street: this.props.user.address.street,
        houseNumber: this.props.user.address.houseNumber,
        city: this.props.user.address.city,
        postalCode: this.props.user.address.postalCode,
        imageUrl: this.props.user.imageUrl
      }).then(res => console.log("RESPONSE POST:", res))
      .then(this.props.getAllEvents)
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    const description = e.target.value;
    this.setState({
      description: description
    });
  };

  render() {
    return (
      <>
        <div>
          {/* <img
            src={this.props.user.imageUrl}
            alt={this.props.user.username}
            className="user-pic" width="5%"
          /> */}
        </div>
        <div>
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
            <Button type="submit">Post</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default AddPost;
