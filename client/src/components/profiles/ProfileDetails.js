import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

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
    following: ""
  };

  getData = () => {
    // get the data from the API
    // update the state accordingly

    const username = this.props.match.params.username;

    axios
      .get(`/api/${username}`)
      .then(response => {
        this.setState(
          {
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
          },
          () => {
            console.log("state", this.state);
            console.log("res", response.data);
          }
        );
      })
      .catch(err => {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log("props", this.props.user.username);
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
            <h1>
              {this.state.username}{" "}
              <Button variant="outline-info">
                <h5>{`\u2709`} Message me</h5>
              </Button>
            </h1>
            <h5 className="mt-5">About Me</h5>
            <p className="mt-3 mb-5">{this.state.aboutMe}Testing</p>
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
// imported in Apps.js

// console.log(this.props.match.params.username);
// console.log(this.props.allUsers);
// let profileOwner = "";

// if (this.props.allUser) {
//   const profileUsername = this.props.match.params.username;
//   profileOwner = this.props.allUser.filter(
//     el => el.username === profileUsername
//   );
