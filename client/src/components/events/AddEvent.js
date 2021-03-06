import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { handleUpload } from "../../services/upload-img";
import EventPic from "./EventPic";
import { getFormattedDate } from "../../services/general-functions.js";

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
      "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg",
    photoMessage: null,
    inputWarning: null,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    let street = this.state.street.trim();
    let city = this.state.city.trim();
    let houseNumber = this.state.houseNumber.trim();
    if (!city || !street || !houseNumber) {
      this.setState({
        inputWarning:
          "* The street, city and house number input should contain valid characters",
      });
      return;
    }

    const { name, postalCode, date, time, imageUrl, description } = this.state;

    let eventDate = new Date(date);
    const eventTimeArr = time.split(":");
    const hh = Number(eventTimeArr[0]);
    const mm = Number(eventTimeArr[1]);
    eventDate.setHours(hh, mm, 0);

    axios
      .post("/api/events", {
        type: "event",
        name,
        street,
        houseNumber,
        city,
        postalCode,
        date: eventDate,
        time,
        imageUrl,
        description,
      })
      .then((res) => {
        if (res.data.errMessage) {
          this.setState({
            inputWarning: `* ${res.data.errMessage}`,
          });

          return;
        }
        this.props.history.push(`/events/${res.data._id}`); // Redirect
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (e) => {
    let imgSizeLimit = 5000000; //5MB
    let allowedFormat = ["image/jpeg", "image/png"];
    let chosenFile = e.target.files[0];

    if (!chosenFile) {
      this.setState({
        imageUrl:
          "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg",
      });
      return;
    }

    if (chosenFile.size > imgSizeLimit) {
      this.setState({
        photoMessage: "* Size of image should be less than 5MB",
        imageUrl:
          "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg",
      });
      return;
    }

    if (allowedFormat.indexOf(chosenFile.type) < 0) {
      this.setState({
        photoMessage: "* Format of image should be jpeg or png",
        imageUrl:
          "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575651991/kiez/default-event-img.jpg.jpg",
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

    this.setState({ uploadOn: true, photoMessage: "" });
    handleUpload(uploadData)
      .then((response) => {
        this.setState({
          imageUrl: response.secure_url,
          uploadOn: false,
        });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <Container className="container event-form-container mt-2 mb-5">
        <h1 className="mx-2 h1-heading">
          Create an event for your neighborhood
        </h1>
        <Row>
          <Col md={5} lg={4} className="event-form-img-container">
            <EventPic
              imageUrl={this.state.imageUrl}
              handleFileUpload={this.handleFileUpload}
            />
            <p className="warning">{this.state.photoMessage}</p>
          </Col>

          <Col md={7} lg={8}>
            <Form
              onSubmit={this.handleFormSubmit}
              className="row mx-lg-5 mt-lg-4"
            >
              <Form.Group className="col-12">
                {this.state.inputWarning && (
                  <p className="warning">{this.state.inputWarning}</p>
                )}
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
                  required={true}
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
                  required={true}
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
                  required={true}
                />
              </Form.Group>

              <Form.Group className="col-4">
                <Form.Label htmlFor="postalCode">Postalcode: </Form.Label>
                <Form.Control
                  type="number"
                  name="postalCode"
                  min="0"
                  id="postalCode"
                  onChange={this.handleChange}
                  value={this.state.postalCode}
                  required={true}
                />
              </Form.Group>

              <Form.Group className="col-6">
                <Form.Label htmlFor="date">Date: </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  id="date"
                  min={getFormattedDate(new Date())}
                  onChange={this.handleChange}
                  value={this.state.date}
                  required={true}
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
                  required={true}
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
              <div className="col-12 flex-end-btn">
                <Button type="submit">Create an Event</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddEvent;
