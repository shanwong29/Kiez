import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import AddEvent from "./AddEvent";

class EventDetails extends Component {
  state = {
    event: null,
    name: "",
    address: null,
    // street: "",
    // houseNumber: "",
    // city: "",
    // postalCode: "",
    date: "",
    time: "",
    photo: "",
    description: ""
  };

  getSingleProject = () => {
    const { params } = this.props.match;
    axios
      .get(`/api/events/${params.id}`)
      .then(responseFromApi => {
        this.setState({
          event: responseFromApi.data,
          name: responseFromApi.data.name,
          address: responseFromApi.data.address,
          date: responseFromApi.data.date,
          time: responseFromApi.data.time,
          photo: responseFromApi.data.photo,
          description: responseFromApi.data.description
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSingleProject();
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
      </div>
    );
  }

}

export default EventDetails;
