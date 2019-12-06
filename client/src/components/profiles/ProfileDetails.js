import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import AboutMe from "./AboutMe";
import ProfilePic from "./ProfilePic";
import { handleUpload } from "../../services/upload-img";
import OfferService from "./OfferService";

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
    editAboutMe: false,
    showOfferServiceForm: false,
    serviceInput: ""
  };

  componentDidMount() {
    this.getData();
  }

  // get profile owner's data and update the state
  getData = () => {
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleForm = obj => {
    this.setState(obj);
  };

  toggleEditAboutMe = () => {
    this.setState({
      editAboutMe: !this.state.editAboutMe
    });
  };

  toggleOfferServiceForm = () => {
    this.setState({ showOfferServiceForm: !this.state.showOfferServiceForm });
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
    this.getData();
    this.toggleEditAboutMe();
  };

  // this method handles the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then(response => {
        this.setState({
          imageUrl: response.secure_url,
          uploadOn: false
        }); /*e */
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this method handles the file submit
  handleSubmitFile = e => {
    e.preventDefault();

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
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  handleSubmitOfferService = e => {
    e.preventDefault();
    axios
      .put(`/api/user/offer-service/${this.state.username}`, {
        offerService: this.state.serviceInput
      })
      .then(response => {
        this.setState(
          {
            offerService: response.data.offerService,
            serviceInput: ""
          },
          () => {
            console.log("data", response.data);

            this.getData();
            console.log("here", this.state.serviceInput);
          }
        );
      })
      .catch(error => console.log(error));
  };

  // cancelServiceChanges = () => {
  //   console.log("HGjahkjda");
  //   this.getData();
  //   this.toggleOfferServiceForm();
  // };

  deleteService = serviceItem => {
    // let newServiceItem = [...this.state.offerService].splice(index, 1);
    console.log("123", this.state.offerService);

    console.log("0", serviceItem);
    axios
      .put(`/api/user/offer-service-delete/${this.state.username}`, {
        offerService: serviceItem
      })
      .then(response => {
        this.setState(
          {
            offerService: response.data.OfferService
          },
          () => {
            this.getData();

            console.log("afterdelete", response.data);
          }
        );
      })
      .catch(error => console.log(error));
  };

  render() {
    let sameUser = false;
    if (this.state.username === this.props.user.username) {
      sameUser = true;
    }

    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return (
      <Container className="my-5 px-5">
        <Row>
          <Col md={6} className="my-5">
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
            {sameUser && <h5>address: </h5>}
          </Col>
          <Col md={6} className="my-5">
            <h1>
              {this.state.username}
              {" " + "\u0020"}
              {!sameUser && (
                <Button variant="outline-info">{`\u2709`} Message me</Button>
              )}
            </h1>

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
            <h3 className="mt-5 mb-5">I can lend...</h3>
            <p className="mt-5"></p>
            <OfferService
              sameUser={sameUser}
              offerService={this.state.offerService}
              showOfferServiceForm={this.state.showOfferServiceForm}
              toggleOfferServiceForm={this.toggleOfferServiceForm}
              handleChange={this.handleChange}
              // cancelServiceChanges={this.cancelServiceChanges}
              serviceInput={this.state.serviceInput}
              handleSubmitOfferService={this.handleSubmitOfferService}
              deleteService={this.deleteService}
            />
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
