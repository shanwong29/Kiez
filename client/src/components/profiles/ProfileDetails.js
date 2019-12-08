import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import AboutMe from "./AboutMe";
import ProfilePic from "./ProfilePic";
import { handleUpload } from "../../services/upload-img";
import OfferService from "./OfferService";
import OfferStuff from "./OfferStuff";
import Reference from "./Reference";
import DeleteButton from "../DeleteButton";

class ProfileDetails extends Component {
  state = {
    _id: null,
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
    showAboutMeForm: false,
    showOfferServiceForm: false,
    showOfferStuffForm: false,
    showReferenceForm: false,
    showReferenceAlert: false,
    serviceInput: "",
    stuffInput: "",
    referenceInput: "",
    creditInput: "",
    authorCredits: this.props.user.credits,
    rating: 0,
    showDeleteAlert: false
    // photoMessage: null
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidMount() {
    this.getData();
  }

  // get profile owner's data and update the state
  getData = () => {
    const username = this.props.match.params.username;

    axios
      .get(`/api/user/${username}`)
      .then(response => {
        console.log("getData", response);
        this.setState({
          _id: response.data._id,
          username: response.data.username,

          // street: response.data.address.street,
          // houseNumber: response.data.address.houseNumber,
          // city: response.data.address.city,
          // postalCode: response.data.address.postalCode,
          offerStuff: response.data.offerStuff,
          offerService: response.data.offerService,
          imageUrl: response.data.imageUrl,
          aboutMe: response.data.aboutMe,
          reference: response.data.reference.reverse(),
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

  // AboutMe Functions
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
            this.getData();
            this.toggleForm({ showAboutMeForm: !this.state.showAboutMeForm });
          }
        );
      })
      .catch(error => console.log(error));
  };

  cancel = () => {
    this.getData();
    this.toggleForm({ showAboutMeForm: !this.state.showAboutMeForm });
  };

  // Image Upload function
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

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

  // update user's image
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
            // photoMessage: "Image has been updated successfully"
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  //offer Service functions
  handleSubmitOfferService = e => {
    e.preventDefault();
    if (this.state.serviceInput !== "") {
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
              this.getData();
            }
          );
        })
        .catch(error => console.log(error));
    }
  };

  deleteService = deleteItem => {
    axios
      .put(`/api/user/offer-service-delete/${this.state.username}`, {
        offerService: deleteItem
      })
      .then(response => {
        this.setState(
          {
            offerService: response.data.OfferService
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  //offer Stuff functions
  handleSubmitOfferStuff = e => {
    e.preventDefault();
    if (this.state.stuffInput) {
      axios

        .put(`/api/user/offer-stuff/${this.state.username}`, {
          offerStuff: this.state.stuffInput
        })
        .then(response => {
          this.setState(
            {
              offerStuff: response.data.offerStuff,
              stuffInput: ""
            },
            () => {
              this.getData();
            }
          );
        })
        .catch(error => console.log(error));
    }
  };

  deleteStuff = deleteItem => {
    axios
      .put(`/api/user/offer-stuff-delete/${this.state.username}`, {
        offerStuff: deleteItem
      })
      .then(response => {
        this.setState(
          {
            offerStuff: response.data.offerStuff
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  // Reference
  firstAddRef = stars => {
    if (!this.state.referenceInput) {
      return;
    }
    console.log("hit firstAddRef, params Stars= ", stars);
    let num = stars;
    console.log("type of stars", typeof stars);

    this.toggleForm({ showReferenceAlert: true });
    this.setState({ rating: stars });
    console.log("In firstAddRef after setState", this.state.rating);
  };

  cancelReferenceChange = () => {
    this.getData();
    this.toggleForm({ showReferenceAlert: false, showReferenceForm: false });
  };

  axiosCreateRef = () => {
    axios
      .post("api/reference", {
        content: this.state.referenceInput,
        author: this.props.user._id,
        rating: this.state.rating,
        profileOwner: this.state._id
      })
      .then(response => {
        this.setState({
          referenceInput: ""
        });
        console.log("1", response);
        this.getData();
      })
      .catch(err => console.log(err));
  };

  axiosUpdateAuthorCredits = () => {
    axios
      .put("api/reference/credits/author", {
        author: this.props.user._id,
        authorCredits:
          parseInt(this.state.authorCredits, 10) -
          parseInt(this.state.creditInput, 10)
      })
      .then(response => {
        console.log(2, response);
        this.setState({
          creditInput: "",
          rating: 0
        });
        this.getData();
      })
      .catch(err => console.log(err));
  };

  axiosUpdateProfileOwnerCredits = () => {
    axios
      .put("api/reference/credits/profile-owner", {
        username: this.state.username,
        credits:
          parseInt(this.state.credits, 10) +
          parseInt(this.state.creditInput, 10)
      })
      .then(response => {
        console.log("3", response);
        this.getData();
      })
      .catch(err => console.log(err));
  };

  addReference = stars => {
    // e.preventDefault();
    this.setState({ rating: stars });
    console.log("ABCD", this.state.rating);
    this.axiosCreateRef();
    this.axiosUpdateAuthorCredits();
    this.axiosUpdateProfileOwnerCredits();
    this.setState({
      showReferenceAlert: false
    });
  };

  //Delete Account
  deleteAccount = () => {
    axios
      .delete(`/api/user/${this.state.username}`, { id: this.state._id })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  toggleAlertFunction = () => {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  };

  render() {
    let alertMessage = (
      <p>
        IMPORTANT!! <br />
        Are you sure you want to delete your account??
      </p>
    );

    let sameUser = false;
    if (this.state._id === this.props.user._id) {
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
        {sameUser && (
          <DeleteButton
            alertMessage={alertMessage}
            toggleAlertFunction={this.toggleAlertFunction}
            deleteFunction={this.deleteAccount}
            showDeleteAlert={this.state.showDeleteAlert}
          />
        )}
        <Row>
          <Col md={6} className="my-5">
            <ProfilePic
              user={this.props.user}
              sameUser={sameUser}
              imageUrl={this.state.imageUrl}
              handleFileUpload={this.handleFileUpload}
              handleSubmitFile={this.handleSubmitFile}
              // photoMessage={this.state.photoMessage}
            />

            <h5 className="my-3">
              Credits: <span>{this.state.credits}</span>
            </h5>
            {sameUser && (
              <>
                <h5>address: </h5>{" "}
                <p style={{ color: "red" }}>*Only you can see the address</p>
              </>
            )}
          </Col>
          <Col md={6} className="my-5">
            <h1>
              {this.state.username}
              {" " + "\u0020"}
              {!sameUser && this.props.user && (
                <Button variant="outline-info">{`\u2709`} Message me</Button>
              )}
            </h1>

            <AboutMe
              sameUser={sameUser}
              user={this.props.user}
              state={this.state}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              cancel={this.cancel}
              updateAboutMe={this.updateAboutMe}
            />
          </Col>

          <Col md={5}>
            <OfferStuff
              sameUser={sameUser}
              offerStuff={this.state.offerStuff}
              showOfferStuffForm={this.state.showOfferStuffForm}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              stuffInput={this.state.stuffInput}
              handleSubmitOfferStuff={this.handleSubmitOfferStuff}
              deleteStuff={this.deleteStuff}
            />
            <p className="mt-5"></p>
            <OfferService
              sameUser={sameUser}
              offerService={this.state.offerService}
              showOfferServiceForm={this.state.showOfferServiceForm}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              serviceInput={this.state.serviceInput}
              handleSubmitOfferService={this.handleSubmitOfferService}
              deleteService={this.deleteService}
            />
          </Col>
          <Col md={7}>
            <Reference
              sameUser={sameUser}
              user={this.props.user}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              cancelReferenceChange={this.cancelReferenceChange}
              firstAddRef={this.firstAddRef}
              addReference={this.addReference}
              showReferenceForm={this.state.showReferenceForm}
              showReferenceAlert={this.state.showReferenceAlert}
              rating={this.state.rating}
              referenceInput={this.state.referenceInput}
              creditInput={this.state.creditInput}
              reference={this.state.reference}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileDetails;
