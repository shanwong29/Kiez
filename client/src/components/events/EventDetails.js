import axios from "axios";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";


class EventDetails extends Component {
  state = {
    editForm: false,

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

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(`/api/events/${params.id}`)
      .then(responseFromApi => {
        console.log("responseFromApi", responseFromApi);
        this.setState({
          event: responseFromApi.data,
          name: responseFromApi.data.name,
          address: responseFromApi.data.address,
          date: responseFromApi.data.date,
          time: responseFromApi.data.time,
          photo: responseFromApi.data.photo,
          description: responseFromApi.data.description
        });
        console.log("STATEE:", this.state.address.street);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSingleEvent();
  }

  // deleteEvent = () => {
  //   const id = this.state.event._id;
  //   axios.delete(`/api`)
  // }  GOOOOOO on hereeeeeeeeeeeeeeeeeeeeeeeeeee!!!!!!

  render() {
    if (!this.state.event) return <div></div>;
    else
      return (
        <Container className="event-details">
          <Row>
            <Col>
              <img
                src="../images/default-event-picture.jpg"
                height="100%"
                width="100%"
                alt=""
              />
            </Col>
            <Col sm={6} className="event-info-container">
              <h1>{this.state.name}</h1>
              <h4>
                {this.state.date.slice(0, 10)} at {this.state.time}
              </h4>
              <h4>
                {this.state.address.street} {this.state.address.houseNumber}, {this.state.address.city}
              </h4>
              <p>{this.state.description}</p>
            </Col>
          </Row>
        </Container>
      );
  }
}

export default EventDetails;
