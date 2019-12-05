import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AboutMe from "./AboutMe";

class ProfileDetails extends Component {
  state = {
    profileOwner: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    offerStuff: "",
    offerService: "",
    photo: "",
    aboutMe: "",
    reference: "",
    credits: "",
    event: "",
    following: "",
    editAboutMe: false
  };

  getData = () => {
    // get the data from the API and update the state accordingly
    const username = this.props.match.params.username;

    axios
      .get(`/api/user/${username}`)
      .then(response => {
        this.setState({
          username: response.data.username,
          // street: response.data.address.street,
          // houseNumber: response.data.address.houseNumber,
          // city: response.data.address.city,
          // postalCode: response.data.address.postalCode,
          offerStuff: response.data.offerStuff,
          offerService: response.data.offerService,
          photo: response.data.photo,
          aboutMe: response.data.aboutMe,
          reference: response.data.reference,
          credits: response.data.credits,
          event: response.data.event,
          following: response.data.following
        });
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  componentDidMount() {
    this.getData();
  }

  toggleEditAboutMe = () => {
    this.setState({
      editAboutMe: !this.state.editAboutMe
    });
  };

  updateAboutMe = () => {
    axios
      .put(`/api/user/${this.state.username}`, { aboutMe: this.state.aboutMe })
      .then(response => {
        this.setState(
          {
            aboutMe: response.data.aboutMe
          },
          () => {
            this.toggleEditAboutMe();
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  cancel = () => {
    this.getData();
    this.toggleEditAboutMe();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return (
      <Container>
        <Row className="m-5">
          <Col md={5} className="my-5">
            <h1>PHOTO</h1>
            <h5 className="my-3">
              Credits: <span>{this.state.credits}</span>
            </h5>
            {this.state.username === this.props.user.username && (
              <h5>address: </h5>
            )}
          </Col>
          <Col md={7} className="my-5">
            {this.state.username !== this.props.user.username ? (
              <h1>
                {this.state.username}
                {" " + "\u0020"}
                <Button variant="outline-info">{`\u2709`} Message me</Button>
              </h1>
            ) : (
              <h1>{this.state.username}</h1>
            )}

            <AboutMe
              user={this.props.user}
              state={this.state}
              toggleEditAboutMe={this.toggleEditAboutMe}
              handleChange={this.handleChange}
              cancel={this.cancel}
              updateAboutMe={this.updateAboutMe}
            />
          </Col>

          <Col md={5}>
            <h3 className="mt-5">I can lend...</h3>
            <p className="mt-5"></p>
            <h3 className="mt-5">I can help...</h3>
          </Col>
          <Col md={7}>
            <h3 className="mt-5">Reference</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileDetails;
