import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { handleUpload } from "../../services/upload-img";
import EventPic from "./EventPic";

class AddEvent extends Component {
  state = {
    type: "event",
    name: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    date: "",
    time: "",
    description: "",
    imageUrl:
      "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg"
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const {
      name,
      street,
      houseNumber,
      city,
      postalCode,
      date,
      time,
      imageUrl,
      description
    } = this.state;
    axios
      .post("/api/events", {
        name,
        street,
        houseNumber,
        city,
        postalCode,
        date,
        time,
        imageUrl,
        description
      })
      .then(res => {
        console.log("ADD EVENT DATA Back-End:", res.data);
        this.props.history.push(`/events/${res.data._id}`); // Redirect
      })
      .then(this.props.getAllEvents) // to update the eventslist -> so we have the new created event there
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    //console.log(this.state.name)
    this.setState({ [name]: value });
  };

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then(response => {
        this.setState(
          {
            imageUrl: response.secure_url,
            uploadOn: false
          },
          () => console.log("response", response)
        );
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // For Hanna's reference
  // update user's image
  // handleSubmitFile = e => {
  //   e.preventDefault();

  //   if (this.state.uploadOn) return; // do nothing if the file is still being uploaded
  //   axios
  //     .put(`/api/user/profile-pic/${this.state.username}`, {
  //       imageUrl: this.state.imageUrl
  //     })
  //     .then(response => {
  //       this.setState(
  //         {
  //           imageUrl: response.data.imageUrl
  //           // photoMessage: "Image has been updated successfully"
  //         },
  //         () => {
  //           this.getData();
  //         }
  //       );
  //     })
  //     .catch(error => console.log(error));
  // };

  render() {
    return (
      <Container className="container event-form-container">
        <h1>Create an event for your neighborhood</h1>
        <Row>
          <Col md={4}>
            <EventPic
              imageUrl={this.state.imageUrl}
              handleFileUpload={this.handleFileUpload}
              // handleSubmitFile={this.handleSubmitFile}
            />
          </Col>

          <Col md={8}>
            <Form onSubmit={this.handleFormSubmit} className="row m-5">
              <Form.Group className="col-12">
                <Form.Label htmlFor="name">Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required={true}
                />
              </Form.Group>

              <Form.Group className="col-8">
                <Form.Label htmlFor="street">Street: </Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  id="street"
                  onChange={this.handleChange}
                  value={this.state.street}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-4">
                <Form.Label htmlFor="houseNumber">Nr.: </Form.Label>
                <Form.Control
                  type="text"
                  name="houseNumber"
                  id="houseNumber"
                  onChange={this.handleChange}
                  value={this.state.houseNumber}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-8">
                <Form.Label htmlFor="city">City: </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  id="city"
                  onChange={this.handleChange}
                  value={this.state.city}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-4">
                <Form.Label htmlFor="postalCode">Postalcode: </Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  onChange={this.handleChange}
                  value={this.state.postalCode}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-6">
                <Form.Label htmlFor="date">Date: </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  id="date"
                  onChange={this.handleChange}
                  value={this.state.date}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-6">
                <Form.Label htmlFor="time">Time: </Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  id="time"
                  onChange={this.handleChange}
                  value={this.state.time}
                  // required={true}
                />
              </Form.Group>

              <Form.Group className="col-12">
                <Form.Label htmlFor="description">Description: </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows="3"
                  name="description"
                  id="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </Form.Group>

              <Button className="col-12" type="submit">
                Create an Event
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddEvent;
