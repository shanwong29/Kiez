import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AboutMe from "./AboutMe";
import ProfilePic from "./ProfilePic";
import { handleUpload } from "../../services/upload-img";

class ProfileDetails extends Component {
  state = {
    username: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    offerStuff: "",
    offerService: "",
    imageUrl: "",
    aboutMe: "",
    reference: "",
    credits: "",
    event: "",
    following: "",
    editAboutMe: false
  };

  getData = () => {
    // get profile owner's data from the API and update the state accordingly
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
          imageUrl: response.data.imageUrl,
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
    // event.preventDefault();
    this.setState({
      editAboutMe: !this.state.editAboutMe
    });
  };

  updateAboutMe = event => {
    event.preventDefault();
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
    // event.preventDefault();
    this.getData();
    this.toggleEditAboutMe();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          imageUrl: response.secure_url,
          uploadOn: false
        }); /*e */
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this method submits the form
  handleSubmitFile = e => {
    e.preventDefault();
    console.log("here");

    if (this.state.uploadOn) return; // do nothing if the file is still being uploaded
    axios
      .put(`/api/user/profile-pic/${this.state.username}`, {
        imageUrl: this.state.imageUrl
      })
      .then(response => {
        this.setState(
          {
            imageUrl: response.data.imageUrl
          },
          () => {
            console.log(response.data);
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
    // saveNewThing(this.state)
    //   .then(res => {
    //     console.log("added: ", res);
    //     // here you would redirect to some other page
    //   })
    //   .catch(err => {
    //     console.log("Error while adding the thing: ", err);
    //   });
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
            <ProfilePic
              user={this.props.user}
              profileOwnerUserName={this.state.username}
              imageUrl={this.state.imageUrl}
              handleFileUpload={this.handleFileUpload}
              handleSubmitFile={this.handleSubmitFile}
            />

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
