import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
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
    address: "",
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

    showAddressForm: false,

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
    showDeleteAlert: false,
    photoMessage: null,
    showNotEnoughCredit: false,
    showNeedtoWriteSth: false,
    canUpdateImg: false,
    addressInvalidMsg: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getData();
    }
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
        this.setState({
          _id: response.data._id,
          username: response.data.username,
          address: response.data.address,
          street: response.data.address.street,
          houseNumber: response.data.address.houseNumber,
          city: response.data.address.city,
          postalCode: response.data.address.postalCode,
          offerStuff: response.data.offerStuff,
          offerService: response.data.offerService,
          imageUrl: response.data.imageUrl,
          aboutMe: response.data.aboutMe,
          reference: response.data.reference.reverse(),
          credits: response.data.credits,
          event: response.data.event,
          following: response.data.following
          // photoMessage: null
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

  handleCreditChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      showNotEnoughCredit: false
    });
  };

  handleRefChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      showNeedtoWriteSth: false
    });
  };

  toggleForm = obj => {
    this.setState(obj);
  };

  //Update Address
  updateAddress = event => {
    event.preventDefault();

    let street = this.state.street.trim();
    let city = this.state.city.trim();
    let houseNumber = this.state.houseNumber.trim();
    if (!street || !city || !houseNumber) {
      this.setState({
        addressInvalidMsg:
          "The street, city and house number input should contain valid characters "
      });
      return;
    }

    axios
      .put(`/api/user/address/${this.state.username}`, {
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        city: this.state.city,
        postalCode: this.state.postalCode
      })
      .then(response => {
        this.setState({
          address: response.data.address,
          street: response.data.address.street,
          houseNumber: response.data.address.houseNumber,
          city: response.data.address.city,
          postalCode: response.data.address.postalCode,
          addressInvalidMsg: ""
        });
        this.props.setUser(response.data);
        this.toggleForm({ showAddressForm: !this.state.showAddressForm });
      })
      .catch(err => console.log(err));
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
            // this.getData();
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
    let imgSizeLimit = 5000000; //5MB
    let allowedFormat = ["image/jpeg", "image/png"];
    let chosenFile = e.target.files[0];

    if (!chosenFile) {
      this.getData();
      this.setState({
        canUpdateImg: false
      });
      return;
    }

    if (chosenFile.size > imgSizeLimit) {
      this.getData();
      this.setState({
        canUpdateImg: false,
        photoMessage: "Size of image should be less than 5MB"
      });
      return;
    }

    if (allowedFormat.indexOf(chosenFile.type) < 0) {
      this.getData();
      this.setState({
        canUpdateImg: false,
        photoMessage: "Format of image should be jpeg or png"
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

    this.setState({ uploadOn: true, photoMessage: "" });

    handleUpload(uploadData)
      .then(response => {
        this.setState({
          imageUrl: response.secure_url,
          uploadOn: false,
          canUpdateImg: true,
          photoMessage: ""
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
        this.setState({
          imageUrl: response.data.imageUrl,
          photoMessage: "Image has been updated successfully",
          canUpdateImg: false
        });

        this.props.setUser(response.data);
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
          this.setState({
            offerService: response.data.offerService,
            serviceInput: ""
          });
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
            }
            // () => {
            //   this.getData();
            // }
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
    if (this.state.creditInput < 0) {
      return;
    }
    if (
      parseInt(this.state.authorCredits, 10) -
        parseInt(this.state.creditInput, 10) <
      0
    ) {
      this.setState({ showNotEnoughCredit: true });
      return;
    }
    if (!this.state.referenceInput) {
      this.setState({ showNeedtoWriteSth: true });
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
    this.setState({
      rating: 0,
      referenceInput: "",
      creditInput: "",
      showNotEnoughCredit: false,
      showNeedtoWriteSth: false
    });
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
      .delete(`/api/user/${this.state._id}`, { id: this.state._id })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  toggleAlertFunction = () => {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  };

  cancelAddressChange = () => {
    this.setState({ showAddressForm: false });
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
      <Container className="my-md-5 px-lg-5">
        {/* {sameUser && (
          <DeleteButton
            alertMessage={alertMessage}
            toggleAlertFunction={this.toggleAlertFunction}
            deleteFunction={this.deleteAccount}
            showDeleteAlert={this.state.showDeleteAlert}
          />
        )} */}
        <Row>
          <Col md={5} className="my-4" id="profile-left-top-container">
            <ProfilePic
              user={this.props.user}
              sameUser={sameUser}
              imageUrl={this.state.imageUrl}
              handleFileUpload={this.handleFileUpload}
              handleSubmitFile={this.handleSubmitFile}
              photoMessage={this.state.photoMessage}
              canUpdateImg={this.state.canUpdateImg}
            />

            {sameUser && (
              <>
                <h5
                  style={{ color: "grey" }}
                  className="mt-md-4 profile-detail-subhead"
                >
                  Address {" " + "\u0020"}
                  {!this.state.showAddressForm && (
                    <Button
                      onClick={() =>
                        this.toggleForm({
                          showAddressForm: !this.state.showAddressForm
                        })
                      }
                      variant="outline-info"
                    >{`\u270E`}</Button>
                  )}
                </h5>

                {this.state.showAddressForm && (
                  <Form onSubmit={this.updateAddress}>
                    <Row>
                      {this.state.addressInvalidMsg && (
                        <p class="warning col-12">
                          * {this.state.addressInvalidMsg}
                        </p>
                      )}

                      <Form.Group className="col-7">
                        <Form.Label htmlFor="street">Street: </Form.Label>
                        <Form.Control
                          type="text"
                          name="street"
                          id="street"
                          value={this.state.street}
                          onChange={this.handleChange}
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
                    </Row>

                    <Row>
                      <Form.Group className="col-5">
                        <Form.Label htmlFor="postalCode">
                          Postalcode:{" "}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="postalCode"
                          id="postalCode"
                          onChange={this.handleChange}
                          value={this.state.postalCode}
                          required={true}
                          min="0"
                        />
                      </Form.Group>
                      <Form.Group className="col-6">
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
                    </Row>

                    {this.state.error && (
                      <Alert variant="danger">{this.state.error}</Alert>
                    )}

                    <Button
                      variant="outline-success"
                      type="submit"
                      className="mr-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={this.cancelAddressChange}
                    >
                      Cancel
                    </Button>
                  </Form>
                )}

                {!this.state.showAddressForm && (
                  <>
                    <p className="mb-0">
                      {this.state.address.formattedAddress}
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "grey", fontStyle: "italic" }}
                    >
                      * Only you can see your address
                    </p>
                  </>
                )}
              </>
            )}

            <h5
              className="mt-md-4 profile-detail-subhead"
              style={{ color: "grey" }}
            >
              Credit:{" "}
              <span style={{ color: "black" }}>{this.state.credits}</span>
            </h5>
          </Col>

          <Col md={7} className="my-md-4">
            <h1>
              {this.state.username}
              {" " + "\u0020"}
              {!sameUser && this.props.user && (
                <Link
                  to={`/messenger/${this.state._id}`}
                  className="btn btn-outline-info"
                >
                  {`\u2709`} Message me
                </Link>
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

          <Col md={5} id="lend-help-profile-box">
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
            <p className="mt-md-5"></p>
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
              showNotEnoughCredit={this.state.showNotEnoughCredit}
              showNeedtoWriteSth={this.state.showNeedtoWriteSth}
              authorCredits={this.state.authorCredits}
              profileOwner={this.state.username}
              handleRefChange={this.handleRefChange}
              handleCreditChange={this.handleCreditChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileDetails;
