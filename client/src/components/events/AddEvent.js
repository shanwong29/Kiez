import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddEvent extends Component {
  state = {
    name: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    date: "",
    time: "",
    photo: "",
    description: ""
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
      photo,
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
        photo,
        description
      })
      .then(res => {
        console.log("ADD EVENT DATA Back-End:", res.data);
        this.props.history.push(`/events/${res.data._id}`);
      })
      .then(
        this.props.getAllEvents
      )
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(this.state.name)
    this.setState({ [name]: value });
 
  };

  render() {
    return (
      <div className="container event-form-container">
        <h1>Create an event for your neighborhood</h1>
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

          <Form.Group className="col-12">
            <Form.Label htmlFor="photo">Photo: </Form.Label>
            <Form.Control
              type="text"
              name="photo"
              id="photo"
              onChange={this.handleChange}
              value={this.state.photo}
            />
          </Form.Group>

          <Button className="col-12" type="submit">
            Create an Event
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddEvent;
