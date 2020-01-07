import axios from "axios";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleUpload } from "../../services/upload-img";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import EventPic from "./EventPic";
import Guestlist from "./Guestlist";
import Comments from "./Comments";
import {
  getFormattedDate,
  futureEventCheck
} from "../../services/general-functions.js";

class EventDetails extends Component {
  state = {
    editForm: false,
    event: {},

    name: "",
    address: null,
    imageUrl: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    date: "",
    time: "",
    description: "",

    dateForForm: "",
    timeForForm: "",
    photoMessage: null,
    inputWarning: null
  };

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(`/api/events/${params.id}`)
      .then(responseFromApi => {
        let timeForForm = `${responseFromApi.data.time}:00`;

        this.setState({
          event: responseFromApi.data,
          name: responseFromApi.data.name,
          address: responseFromApi.data.address,
          street: responseFromApi.data.address.street,
          houseNumber: responseFromApi.data.address.houseNumber,
          city: responseFromApi.data.address.city,
          postalCode: responseFromApi.data.address.postalCode,
          date: responseFromApi.data.date,
          time: responseFromApi.data.time,
          imageUrl: responseFromApi.data.imageUrl,
          description: responseFromApi.data.description,
          originalImage: responseFromApi.data.imageUrl,
          dateForForm: getFormattedDate(new Date(responseFromApi.data.date)),
          timeForForm
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSingleEvent();
  }

  deleteEvent = () => {
    const id = this.state.event._id;
    axios
      .delete(`/api/events/${id}`)
      .then(response => {
        this.props.history.push("/events/myevents");
      })
      .then(this.props.getAllEvents)
      .catch(err => {
        console.log(err);
      });
  };

  toggleEdit = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileUpload = e => {
    let imgSizeLimit = 5000000; //5MB
    let allowedFormat = ["image/jpeg", "image/png"];
    let chosenFile = e.target.files[0];

    if (!chosenFile) {
      this.setState({
        imageUrl: this.state.originalImage
      });
      return;
    }

    if (chosenFile.size > imgSizeLimit) {
      this.setState({
        photoMessage: "* Size of image should be less than 5MB",
        imageUrl: this.state.originalImage
      });
      return;
    }

    if (allowedFormat.indexOf(chosenFile.type) < 0) {
      this.setState({
        photoMessage: "* Format of image should be jpeg or png",
        imageUrl: this.state.originalImage
      });
      return;
    }
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.setState({ uploadOn: true, photoMessage: "" });
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

  handleFormSubmit = e => {
    e.preventDefault();

    const id = this.props.match.params.id;
    const date = this.state.dateForForm;
    const time = this.state.timeForForm;

    const {
      name,
      street,
      houseNumber,
      city,
      postalCode,
      imageUrl,
      description
    } = this.state;

    axios
      .put(`/api/events/${id}`, {
        name,
        street,
        houseNumber,
        city,
        postalCode,
        imageUrl,
        date,
        time,
        description
      })
      .then(response => {
        const {
          name,
          address,
          imageUrl,
          date,
          time,
          description
        } = response.data;

        this.setState(
          {
            editForm: false,
            event: response.data,
            name,
            address,
            imageUrl,
            date,
            time,
            description
          },
          () => {
            this.getSingleEvent();
          }
        );
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.event.type !== "event") {
      return (
        <div class="bad-link-msg">
          <h1>Sorry, this page isn't available.</h1>
          <p>
            The link you used may be broken, or the page may have been removed.
          </p>
        </div>
      );
    }

    if (!this.state.date) {
      return <></>;
    }
    if (!this.state.event) return <div></div>;

    let description = this.state.description;

    let isFutureEvent = futureEventCheck(this.state.date, this.state.time);

    let canUpdate = false;
    if (
      isFutureEvent &&
      this.state.event.creater._id === this.props.state.user._id
    ) {
      canUpdate = true;
    }

    if (this.state.editForm === false) {
      return (
        <>
          <Container className="event-details">
            {canUpdate && (
              <div className="d-flex justify-content-end mb-5">
                <>
                  <Button
                    variant="outline-info"
                    className="mx-2"
                    onClick={this.toggleEdit}
                  >
                    {`\u270E`} Edit event
                  </Button>
                  {/* <Button variant="outline-danger" onClick={this.deleteEvent}>
                    {`\u2715`} Delete event
                  </Button> */}
                </>
              </div>
            )}
            <Row>
              <Col>
                <img
                  src={this.state.imageUrl}
                  width="80%"
                  alt={this.state.name}
                />
              </Col>
              <Col sm={6} className="event-info-container">
                <h1>{this.state.name}</h1>
                <h5 className="date">
                  {this.state.date.slice(0, 10)} at {this.state.time}
                </h5>
                <h5 className="date">{this.state.address.formattedAddress}</h5>
                <p>
                  {description
                    .trim()
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <span key={index}>
                          {item}

                          <br />
                        </span>
                      );
                    })}
                </p>
              </Col>
            </Row>
          </Container>
          {
            <Container>
              <Row>
                <Col>
                  <Guestlist
                    event={this.state.event}
                    joinedUsers={this.state.event.join}
                    user={this.props.user}
                    allUsers={this.props.allUsers}
                    getSingleEvent={this.getSingleEvent}
                    getAllEvents={this.props.getAllEvents}
                    isFutureEvent={isFutureEvent}
                  />
                </Col>
                <Col>
                  <Comments
                    user={this.props.user}
                    eventId={this.props.match.params.id}
                    event={this.state.event}
                    getSingleEvent={this.getSingleEvent}
                    getAllEvents={this.props.getAllEvents}
                  />
                </Col>
              </Row>
            </Container>
          }
        </>
      );
    }

    if (this.state.editForm === true) {
      return (
        <Container className="container event-form-container mt-2">
          <h1>Edit event</h1>
          <Row>
            <Col md={4} className="event-form-img-container">
              <EventPic
                imageUrl={this.state.imageUrl}
                handleFileUpload={this.handleFileUpload}
              />
              <p class="warning">{this.state.photoMessage}</p>
            </Col>

            <Col md={8}>
              <Form onSubmit={this.handleFormSubmit} className="row m-5">
                <Form.Group className="col-12">
                  {this.state.inputWarning && (
                    <p class="warning">{this.state.inputWarning}</p>
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
                    type="text"
                    name="postalCode"
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
                    name="dateForForm"
                    id="date"
                    min={getFormattedDate(new Date())}
                    onChange={this.handleChange}
                    value={this.state.dateForForm}
                    required={true}
                  />
                </Form.Group>

                <Form.Group className="col-6">
                  <Form.Label htmlFor="time">Time: </Form.Label>
                  <Form.Control
                    type="time"
                    name="timeForForm"
                    id="time"
                    onChange={this.handleChange}
                    value={this.state.timeForForm}
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

                <Button className="col-12" type="submit">
                  Save changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default EventDetails;
